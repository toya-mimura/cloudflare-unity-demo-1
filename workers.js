const HTML_PAGE = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ユーザー設定可能可能目</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .container {
            display: flex;
            gap: 30px;
            max-width: 1200px;
            width: 100%;
        }
        
        .account-section {
            background: #2d3748;
            border-radius: 20px;
            padding: 40px;
            width: 350px;
            color: white;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .avatar {
            width: 120px;
            height: 120px;
            margin: 0 auto 30px;
            display: block;
        }
        
        .account-name {
            font-size: 32px;
            font-weight: 300;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .account-description {
            font-size: 14px;
            line-height: 1.8;
            color: #a0aec0;
            margin-bottom: 30px;
        }
        
        .account-description a {
            color: #cbd5e0;
            text-decoration: underline;
        }
        
        .icon-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        
        .icon-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #4a5568;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: background 0.3s;
        }
        
        .icon-button:hover {
            background: #5a6478;
        }
        
        .settings-section {
            background: #2d3748;
            border-radius: 20px;
            padding: 40px;
            flex: 1;
            color: white;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .settings-title {
            font-size: 28px;
            font-weight: 300;
            margin-bottom: 10px;
        }
        
        .settings-subtitle {
            font-size: 14px;
            color: #a0aec0;
            margin-bottom: 40px;
        }
        
        .setting-block {
            margin-bottom: 40px;
        }
        
        .setting-header {
            font-size: 18px;
            margin-bottom: 15px;
        }
        
        .setting-description {
            font-size: 14px;
            color: #a0aec0;
            margin-bottom: 20px;
        }
        
        .url-input-group {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .url-input {
            flex: 1;
            padding: 15px 20px;
            background: #4a5568;
            border: 2px solid transparent;
            border-radius: 10px;
            color: white;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        }
        
        .url-input:focus {
            border-color: #667eea;
        }
        
        .url-input::placeholder {
            color: #a0aec0;
        }
        
        .apply-button {
            padding: 15px 40px;
            background: #667eea;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .apply-button:hover {
            background: #5568d3;
        }
        
        .toggle-section {
            margin-top: 30px;
        }
        
        .toggle-group {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .toggle-label {
            flex: 1;
            padding: 15px 20px;
            background: #4a5568;
            border-radius: 10px;
            font-size: 14px;
        }
        
        .toggle-button {
            padding: 15px 30px;
            background: #48bb78;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .toggle-button.off {
            background: #718096;
        }
        
        .toggle-button:hover {
            opacity: 0.9;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: #48bb78;
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s;
            pointer-events: none;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .current-url {
            margin-top: 15px;
            padding: 15px;
            background: #4a5568;
            border-radius: 10px;
            font-size: 13px;
            color: #a0aec0;
            word-break: break-all;
        }
        
        .particle-params {
            display: none;
            margin-top: 20px;
            padding: 25px;
            background: #1a202c;
            border-radius: 10px;
        }
        
        .particle-params.visible {
            display: block;
        }
        
        .param-row {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .param-label {
            width: 150px;
            font-size: 14px;
            color: #cbd5e0;
        }
        
        .param-input {
            flex: 1;
            padding: 12px 16px;
            background: #4a5568;
            border: 2px solid transparent;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        }
        
        .param-input:focus {
            border-color: #667eea;
        }
        
        .param-input[type="color"] {
            height: 45px;
            cursor: pointer;
        }
        
        .param-value {
            width: 80px;
            text-align: right;
            font-size: 14px;
            color: #a0aec0;
        }
    </style>
</head>
<body>
    <div class="notification" id="notification">保存しました！</div>
    
    <div class="container">
        <div class="account-section">
            <svg class="avatar" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="95" fill="#f6ad55"/>
                <ellipse cx="75" cy="85" rx="8" ry="12" fill="#2d3748"/>
                <ellipse cx="125" cy="85" rx="8" ry="12" fill="#2d3748"/>
                <path d="M 70 120 Q 100 140 130 120" stroke="#2d3748" stroke-width="3" fill="none"/>
                <circle cx="100" cy="60" r="35" fill="#f6ad55"/>
                <path d="M 65 60 L 55 45 L 60 40" stroke="#f6ad55" stroke-width="8" stroke-linecap="round"/>
                <path d="M 135 60 L 145 45 L 140 40" stroke="#f6ad55" stroke-width="8" stroke-linecap="round"/>
            </svg>
            
            <h1 class="account-name">アカウント名</h1>
            
            <p class="account-description">
                Ultricies suscipit orci curabitur aliquet interdum sed egestas urna orci quisque 
                non ante eu porta <a href="#">nulla donec</a>. Venenatis faucibus nisl quis morbi 
                nibh elit erat gravida <a href="#">aliquam odio viverra</a>.
            </p>
            
            <div class="icon-buttons">
                <button class="icon-button">🎨</button>
                <button class="icon-button">🎵</button>
                <button class="icon-button">📅</button>
            </div>
        </div>
        
        <div class="settings-section">
            <h2 class="settings-title">ユーザー設定可能可能目</h2>
            <p class="settings-subtitle">以下の設定をSRDに反映できます！</p>
            
            <div class="setting-block">
                <h3 class="setting-header">1. 背景パネル</h3>
                <p class="setting-description">背景パネルを指定したウェブサイトに変更できます。</p>
                
                <div class="url-input-group">
                    <input 
                        type="url" 
                        class="url-input" 
                        id="urlInput"
                        placeholder="表示したいサイトのURL"
                    />
                    <button class="apply-button" onclick="saveUrl()">Apply</button>
                </div>
                
                <div class="current-url" id="currentUrl">
                    現在のURL: 読み込み中...
                </div>
            </div>
            
            <div class="setting-block toggle-section">
                <h3 class="setting-header">2. パーティクル</h3>
                <p class="setting-description">パーティクルの表示をONにするとパラメータを変更できます。</p>
                
                <div class="toggle-group">
                    <div class="toggle-label">パーティクルを有効にする</div>
                    <button class="toggle-button" id="particleToggle" onclick="toggleParticle()">OFF</button>
                </div>
                
                <div class="particle-params" id="particleParams">
                    <div class="toggle-group" style="margin-bottom: 30px;">
                        <div class="toggle-label">パーティクルエミッターを表示</div>
                        <button class="toggle-button" id="emitterToggle" onclick="toggleEmitter()">OFF</button>
                    </div>
                    
                    <div class="param-row">
                        <div class="param-label">Duration</div>
                        <input type="range" class="param-input" id="duration" min="0.1" max="10" step="0.1" value="5">
                        <div class="param-value" id="durationValue">5.0</div>
                    </div>
                    
                    <div class="param-row">
                        <div class="param-label">Start Delay</div>
                        <input type="range" class="param-input" id="startDelay" min="0" max="5" step="0.1" value="0">
                        <div class="param-value" id="startDelayValue">0.0</div>
                    </div>
                    
                    <div class="param-row">
                        <div class="param-label">Start Lifetime</div>
                        <input type="range" class="param-input" id="startLifetime" min="0.1" max="10" step="0.1" value="5">
                        <div class="param-value" id="startLifetimeValue">5.0</div>
                    </div>
                    
                    <div class="param-row">
                        <div class="param-label">Start Speed</div>
                        <input type="range" class="param-input" id="startSpeed" min="0" max="20" step="0.5" value="5">
                        <div class="param-value" id="startSpeedValue">5.0</div>
                    </div>
                    
                    <div class="param-row">
                        <div class="param-label">Start Size</div>
                        <input type="range" class="param-input" id="startSize" min="0.1" max="10" step="0.1" value="1">
                        <div class="param-value" id="startSizeValue">1.0</div>
                    </div>
                    
                    <div class="param-row">
                        <div class="param-label">Start Color</div>
                        <input type="color" class="param-input" id="startColor" value="#ffffff">
                        <div class="param-value" id="startColorValue">#FFFFFF</div>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <button class="apply-button" onclick="saveParticleParams()" style="width: 100%;">Apply Particle Settings</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        let particleEnabled = false;
        let emitterEnabled = false;
        
        // 値の更新を監視
        document.getElementById('duration').addEventListener('input', (e) => {
            document.getElementById('durationValue').textContent = parseFloat(e.target.value).toFixed(1);
        });
        document.getElementById('startDelay').addEventListener('input', (e) => {
            document.getElementById('startDelayValue').textContent = parseFloat(e.target.value).toFixed(1);
        });
        document.getElementById('startLifetime').addEventListener('input', (e) => {
            document.getElementById('startLifetimeValue').textContent = parseFloat(e.target.value).toFixed(1);
        });
        document.getElementById('startSpeed').addEventListener('input', (e) => {
            document.getElementById('startSpeedValue').textContent = parseFloat(e.target.value).toFixed(1);
        });
        document.getElementById('startSize').addEventListener('input', (e) => {
            document.getElementById('startSizeValue').textContent = parseFloat(e.target.value).toFixed(1);
        });
        document.getElementById('startColor').addEventListener('input', (e) => {
            document.getElementById('startColorValue').textContent = e.target.value.toUpperCase();
        });
        
        async function loadCurrentUrl() {
            try {
                const response = await fetch('/api/getUrl');
                const data = await response.json();
                document.getElementById('currentUrl').textContent = 
                    '現在のURL: ' + (data.url || '未設定');
                document.getElementById('urlInput').value = data.url || '';
            } catch (error) {
                console.error('URL取得エラー:', error);
            }
        }
        
        async function saveUrl() {
            const url = document.getElementById('urlInput').value;
            
            if (!url) {
                alert('URLを入力してください');
                return;
            }
            
            try {
                const response = await fetch('/api/setUrl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: url })
                });
                
                if (response.ok) {
                    showNotification('保存しました！');
                    loadCurrentUrl();
                } else {
                    alert('保存に失敗しました');
                }
            } catch (error) {
                console.error('保存エラー:', error);
                alert('エラーが発生しました');
            }
        }
        
        function toggleParticle() {
            particleEnabled = !particleEnabled;
            const toggleBtn = document.getElementById('particleToggle');
            const paramsDiv = document.getElementById('particleParams');
            
            if (particleEnabled) {
                toggleBtn.textContent = 'ON';
                toggleBtn.classList.remove('off');
                paramsDiv.classList.add('visible');
            } else {
                toggleBtn.textContent = 'OFF';
                toggleBtn.classList.add('off');
                paramsDiv.classList.remove('visible');
            }
        }
        
        function toggleEmitter() {
            emitterEnabled = !emitterEnabled;
            const toggleBtn = document.getElementById('emitterToggle');
            
            if (emitterEnabled) {
                toggleBtn.textContent = 'ON';
                toggleBtn.classList.remove('off');
            } else {
                toggleBtn.textContent = 'OFF';
                toggleBtn.classList.add('off');
            }
            
            // エミッター状態を即座に保存
            saveParticleParams();
        }
        
        async function saveParticleParams() {
            const params = {
                enabled: particleEnabled,
                emitterEnabled: emitterEnabled,
                duration: parseFloat(document.getElementById('duration').value),
                startDelay: parseFloat(document.getElementById('startDelay').value),
                startLifetime: parseFloat(document.getElementById('startLifetime').value),
                startSpeed: parseFloat(document.getElementById('startSpeed').value),
                startSize: parseFloat(document.getElementById('startSize').value),
                startColor: document.getElementById('startColor').value.toUpperCase()
            };
            
            try {
                const response = await fetch('/api/setParticleParams', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params)
                });
                
                if (response.ok) {
                    showNotification('パーティクル設定を保存しました！');
                } else {
                    alert('保存に失敗しました');
                }
            } catch (error) {
                console.error('保存エラー:', error);
                alert('エラーが発生しました');
            }
        }
        
        async function loadParticleParams() {
            try {
                const response = await fetch('/api/getParticleParams');
                const data = await response.json();
                
                if (data.enabled !== undefined) {
                    particleEnabled = data.enabled;
                    const toggleBtn = document.getElementById('particleToggle');
                    const paramsDiv = document.getElementById('particleParams');
                    
                    if (particleEnabled) {
                        toggleBtn.textContent = 'ON';
                        toggleBtn.classList.remove('off');
                        paramsDiv.classList.add('visible');
                    }
                }
                
                if (data.emitterEnabled !== undefined) {
                    emitterEnabled = data.emitterEnabled;
                    const emitterBtn = document.getElementById('emitterToggle');
                    
                    if (emitterEnabled) {
                        emitterBtn.textContent = 'ON';
                        emitterBtn.classList.remove('off');
                    } else {
                        emitterBtn.textContent = 'OFF';
                        emitterBtn.classList.add('off');
                    }
                }
                
                if (data.duration !== undefined) {
                    document.getElementById('duration').value = data.duration;
                    document.getElementById('durationValue').textContent = data.duration.toFixed(1);
                }
                if (data.startDelay !== undefined) {
                    document.getElementById('startDelay').value = data.startDelay;
                    document.getElementById('startDelayValue').textContent = data.startDelay.toFixed(1);
                }
                if (data.startLifetime !== undefined) {
                    document.getElementById('startLifetime').value = data.startLifetime;
                    document.getElementById('startLifetimeValue').textContent = data.startLifetime.toFixed(1);
                }
                if (data.startSpeed !== undefined) {
                    document.getElementById('startSpeed').value = data.startSpeed;
                    document.getElementById('startSpeedValue').textContent = data.startSpeed.toFixed(1);
                }
                if (data.startSize !== undefined) {
                    document.getElementById('startSize').value = data.startSize;
                    document.getElementById('startSizeValue').textContent = data.startSize.toFixed(1);
                }
                if (data.startColor) {
                    document.getElementById('startColor').value = data.startColor;
                    document.getElementById('startColorValue').textContent = data.startColor;
                }
            } catch (error) {
                console.error('パーティクル設定取得エラー:', error);
            }
        }
        
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
        
        // 初期化
        loadCurrentUrl();
        loadParticleParams();
    </script>
</body>
</html>
`;

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// トップページ
		if (url.pathname === '/' || url.pathname === '') {
			return new Response(HTML_PAGE, {
				headers: {
					'Content-Type': 'text/html;charset=UTF-8',
				},
			});
		}

		// URL取得API
		if (url.pathname === '/api/getUrl' && request.method === 'GET') {
			const savedUrl = await env.WEBVIEW_KV.get('webview_url');
			return new Response(JSON.stringify({ url: savedUrl || '' }), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders,
				},
			});
		}

		// URL保存API
		if (url.pathname === '/api/setUrl' && request.method === 'POST') {
			try {
				const body = await request.json();
				await env.WEBVIEW_KV.put('webview_url', body.url);
				return new Response(JSON.stringify({ success: true }), {
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			} catch (error) {
				return new Response(JSON.stringify({ error: 'Invalid request' }), {
					status: 400,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			}
		}

		// パーティクルパラメータ取得API
		if (url.pathname === '/api/getParticleParams' && request.method === 'GET') {
			const savedParams = await env.WEBVIEW_KV.get('particle_params');
			const params = savedParams ? JSON.parse(savedParams) : {
				enabled: false,
				emitterEnabled: false,
				duration: 5.0,
				startDelay: 0.0,
				startLifetime: 5.0,
				startSpeed: 5.0,
				startSize: 1.0,
				startColor: '#FFFFFF'
			};
			return new Response(JSON.stringify(params), {
				headers: {
					'Content-Type': 'application/json',
					...corsHeaders,
				},
			});
		}

		// パーティクルパラメータ保存API
		if (url.pathname === '/api/setParticleParams' && request.method === 'POST') {
			try {
				const body = await request.json();
				
				// パラメータの妥当性チェック
				const params = {
					enabled: body.enabled === true,
					emitterEnabled: body.emitterEnabled === true,
					duration: Math.max(0.1, Math.min(10, body.duration || 5)),
					startDelay: Math.max(0, Math.min(5, body.startDelay || 0)),
					startLifetime: Math.max(0.1, Math.min(10, body.startLifetime || 5)),
					startSpeed: Math.max(0, Math.min(20, body.startSpeed || 5)),
					startSize: Math.max(0.1, Math.min(10, body.startSize || 1)),
					startColor: body.startColor || '#FFFFFF'
				};
				
				await env.WEBVIEW_KV.put('particle_params', JSON.stringify(params));
				return new Response(JSON.stringify({ success: true, params }), {
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			} catch (error) {
				return new Response(JSON.stringify({ error: 'Invalid request' }), {
					status: 400,
					headers: {
						'Content-Type': 'application/json',
						...corsHeaders,
					},
				});
			}
		}

		return new Response('Not Found', { status: 404 });
	},
};
