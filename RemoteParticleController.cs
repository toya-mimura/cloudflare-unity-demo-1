using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

/// <summary>
/// 外部WebサイトからパーティクルパラメータをHTTPポーリングで取得し、
/// Particle Systemに反映するコントローラー
/// </summary>
public class RemoteParticleController : MonoBehaviour
{
    [Header("設定")]
    [Tooltip("制御対象のParticle System")]
    public ParticleSystem targetParticle;
    
    [Tooltip("APIのベースURL")]
    public string apiBaseUrl = "https://snowy-bar-c164.toya-mimura-cflare.workers.dev";
    
    [Tooltip("ポーリング間隔（秒）")]
    public float pollingInterval = 2f;
    
    [Header("デバッグ")]
    [Tooltip("デバッグログを表示する")]
    public bool showDebugLog = true;
    
    private ParticleParams lastParams;
    private string apiUrl;

    void Start()
    {
        // APIのURLを構築
        apiUrl = apiBaseUrl + "/api/getParticleParams";
        
        // Particle Systemの参照チェック
        if (targetParticle == null)
        {
            targetParticle = GetComponent<ParticleSystem>();
            if (targetParticle == null)
            {
                Debug.LogError("[RemoteParticleController] Particle Systemが見つかりません！");
                enabled = false;
                return;
            }
        }
        
        Log("RemoteParticleController初期化完了");
        Log("API URL: " + apiUrl);
        
        // ポーリング開始
        StartCoroutine(PollParticleParams());
    }

    IEnumerator PollParticleParams()
    {
        while (true)
        {
            yield return StartCoroutine(FetchAndApplyParams());
            yield return new WaitForSeconds(pollingInterval);
        }
    }

    IEnumerator FetchAndApplyParams()
    {
        UnityWebRequest request = UnityWebRequest.Get(apiUrl);
        
        // タイムアウト設定（5秒）
        request.timeout = 5;
        
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            try
            {
                string json = request.downloadHandler.text;
                ParticleParams newParams = JsonUtility.FromJson<ParticleParams>(json);
                
                // パラメータが変更された場合のみ適用
                if (HasParamsChanged(newParams))
                {
                    ApplyParticleParams(newParams);
                    lastParams = newParams;
                    Log("パーティクルパラメータを更新しました");
                }
            }
            catch (System.Exception e)
            {
                Debug.LogError("[RemoteParticleController] JSONパースエラー: " + e.Message);
            }
        }
        else
        {
            Debug.LogWarning("[RemoteParticleController] リクエスト失敗: " + request.error);
        }
    }

    bool HasParamsChanged(ParticleParams newParams)
    {
        if (lastParams == null)
        {
            return true;
        }
        
        return lastParams.enabled != newParams.enabled ||
               !Mathf.Approximately(lastParams.duration, newParams.duration) ||
               !Mathf.Approximately(lastParams.startDelay, newParams.startDelay) ||
               !Mathf.Approximately(lastParams.startLifetime, newParams.startLifetime) ||
               !Mathf.Approximately(lastParams.startSpeed, newParams.startSpeed) ||
               !Mathf.Approximately(lastParams.startSize, newParams.startSize) ||
               lastParams.startColor != newParams.startColor;
    }

    void ApplyParticleParams(ParticleParams param)
    {
        // パーティクルの有効/無効
        if (!param.enabled)
        {
            if (targetParticle.isPlaying)
            {
                targetParticle.Stop();
                Log("パーティクルを停止しました");
            }
            return;
        }
        
        // パーティクルのメインモジュールを取得
        var main = targetParticle.main;
        
        // 各パラメータを適用
        main.duration = param.duration;
        main.startDelay = param.startDelay;
        main.startLifetime = param.startLifetime;
        main.startSpeed = param.startSpeed;
        main.startSize = param.startSize;
        main.startColor = HexToColor(param.startColor);
        
        // パーティクルが停止中なら再生
        if (!targetParticle.isPlaying)
        {
            targetParticle.Play();
            Log("パーティクルを再生しました");
        }
        else
        {
            // 既に再生中の場合は一旦クリアして再生
            targetParticle.Clear();
            targetParticle.Play();
        }
        
        LogParamValues(param);
    }

    Color HexToColor(string hex)
    {
        // #を除去
        if (hex.StartsWith("#"))
        {
            hex = hex.Substring(1);
        }
        
        // カラーコードをパース
        Color color;
        if (ColorUtility.TryParseHtmlString("#" + hex, out color))
        {
            return color;
        }
        
        Debug.LogWarning("[RemoteParticleController] 無効なカラーコード: " + hex);
        return Color.white;
    }

    void Log(string message)
    {
        if (showDebugLog)
        {
            Debug.Log("[RemoteParticleController] " + message);
        }
    }

    void LogParamValues(ParticleParams param)
    {
        if (!showDebugLog)
        {
            return;
        }
        
        Debug.Log("[RemoteParticleController] パラメータ詳細:\n" +
                  "  Enabled: " + param.enabled + "\n" +
                  "  Duration: " + param.duration + "\n" +
                  "  Start Delay: " + param.startDelay + "\n" +
                  "  Start Lifetime: " + param.startLifetime + "\n" +
                  "  Start Speed: " + param.startSpeed + "\n" +
                  "  Start Size: " + param.startSize + "\n" +
                  "  Start Color: " + param.startColor);
    }

    void OnDestroy()
    {
        // コルーチンを停止
        StopAllCoroutines();
    }
}

/// <summary>
/// パーティクルパラメータを格納するクラス
/// JSONとの互換性のため、フィールド名はAPIと一致させる必要がある
/// </summary>
[System.Serializable]
public class ParticleParams
{
    public bool enabled;
    public float duration;
    public float startDelay;
    public float startLifetime;
    public float startSpeed;
    public float startSize;
    public string startColor;
}
