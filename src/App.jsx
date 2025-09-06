import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [backToTopVisible, setBackToTopVisible] = useState(false)

  // 主题切换
  const toggleTheme = () => {
    setIsDark(!isDark)
    localStorage.setItem('theme', !isDark ? 'dark' : 'light')
  }

  // 加载保存的主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
    }
  }, [])

  // 应用主题到body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDark])

  // 滚动处理
  useEffect(() => {
    const handleScroll = () => {
      // 回到顶部按钮显示/隐藏
      if (window.pageYOffset > 300) {
        setBackToTopVisible(true)
      } else {
        setBackToTopVisible(false)
      }
      
      // 元素淡入动画
      const fadeElements = document.querySelectorAll('.fade-in')
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始调用

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 初始化 Mermaid 和 MathJax
  useEffect(() => {
    // 初始化 Mermaid
    if (window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        themeVariables: {
          primaryColor: '#667eea',
          primaryTextColor: '#2d3748',
          primaryBorderColor: '#667eea',
          lineColor: '#667eea',
          secondaryColor: '#f093fb',
          tertiaryColor: '#e2e8f0'
        }
      })

      // 渲染所有Mermaid图表
      const renderMermaidCharts = async () => {
        const mermaidElements = document.querySelectorAll('.mermaid')
        mermaidElements.forEach(async (element, index) => {
          const graphDefinition = element.textContent.trim()
          if (graphDefinition) {
            try {
              const { svg } = await window.mermaid.render(`mermaid-${index}`, graphDefinition)
              element.innerHTML = svg
            } catch (error) {
              console.error('Mermaid rendering error:', error)
            }
          }
        })
      }

      // 延迟渲染以确保DOM已加载
      setTimeout(renderMermaidCharts, 1000)
    }

    // 初始化 MathJax
    if (window.MathJax) {
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        svg: {
          fontCache: 'global'
        }
      }
    }

    // 添加卡片交互效果
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)'
      })

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)'
      })
    })

    // 添加脉冲效果到重要元素
    const highlights = document.querySelectorAll('.highlight')
    highlights.forEach(element => {
      element.classList.add('pulse')
    })

    // 键盘快捷键
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + D 切换主题
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        toggleTheme()
      }

      // 按 T 键回到顶部
      if (e.key === 't' || e.key === 'T') {
        scrollToTop()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // 平滑滚动
  const smoothScroll = (target) => {
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Sentient中文社区</div>
          <ul className="nav-links">
            <li><a href="#overview" onClick={(e) => { e.preventDefault(); smoothScroll('#overview'); }}>概述</a></li>
            <li><a href="#technical" onClick={(e) => { e.preventDefault(); smoothScroll('#technical'); }}>技术摘要</a></li>
            <li><a href="#architecture" onClick={(e) => { e.preventDefault(); smoothScroll('#architecture'); }}>架构</a></li>
            <li><a href="#flow" onClick={(e) => { e.preventDefault(); smoothScroll('#flow'); }}>流程</a></li>
            <li><a href="#modules" onClick={(e) => { e.preventDefault(); smoothScroll('#modules'); }}>模块</a></li>
            <li><a href="#limitations" onClick={(e) => { e.preventDefault(); smoothScroll('#limitations'); }}>限制与未来</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="hero">
        <div className="hero-content">
          <h1>OML范式：重新定义AI模型服务</h1>
          <p>开放访问 • 可货币化 • 忠诚 - 构建公平可持续的AI生态系统</p>
          <div className="hero-tags">
            <span className="tag">AI原生密码学</span>
            <span className="tag">区块链技术</span>
            <span className="tag">分布式系统</span>
            <span className="tag">模型指纹</span>
            <span className="tag">可信执行环境</span>
          </div>
        </div>
      </section>

      {/* 概述 */}
      <section id="overview" className="section">
        <div className="container">
          <h2 className="section-title">概述</h2>
          <div className="card fade-in">
            <h3>研究背景</h3>
            <p>当前AI模型服务存在两种主流范式，但都伴随着显著的痛点。<strong>开放权重分发模式</strong>（如Llama）允许用户本地运行模型，提供了数据隐私和使用灵活性，但模型所有者难以控制模型使用，且面临货币化挑战。<strong>API服务模式</strong>（如OpenAI API）便于货币化和控制，但牺牲了用户的数据隐私、模型透明度和控制权。</p>
          </div>
          
          <div className="card fade-in">
            <h3>OML范式的价值主张</h3>
            <p>OML（Open-access, Monetizable, and Loyal）范式通过引入"忠诚"属性，在保持模型开放访问的同时，确保模型所有者能够实现细粒度的货币化和对模型使用的控制。这就像给模型装上了一个"智能锁"，只有获得授权才能正常工作，从而构建一个更公平、可持续的AI生态系统。</p>
          </div>

          <div className="grid">
            <div className="card fade-in">
              <h3>🔓 开放访问</h3>
              <p>模型可供下载并在本地执行，提供数据隐私、一致的服务质量和本地增强能力。模型一旦发布，其特定实例不可被所有者单方面更改。</p>
            </div>
            <div className="card fade-in">
              <h3>💰 可货币化</h3>
              <p>通过细粒度的、按实例授权协议，模型所有者可从每次使用中获取经济价值，支持按次付费模式。</p>
            </div>
            <div className="card fade-in">
              <h3>🛡️ 忠诚</h3>
              <p>模型严格遵守所有者的操作条款，通过预先授权强制执行，主动防止未经授权或不合规的内容生成。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 技术摘要 */}
      <section id="technical" className="section">
        <div className="container">
          <h2 className="section-title">技术摘要</h2>
          
          <div className="card fade-in">
            <h3>核心思想</h3>
            <p>引入<span className="highlight">OMLize转换函数</span>，将原始AI模型M转换为<span className="highlight">OML格式模型M.oml</span>。M.oml模型内嵌了授权验证逻辑，使其正确执行依赖于有效的权限令牌。这种深度耦合确保了模型在开放分发后，仍能遵守所有者的使用条款。</p>
          </div>

          <div className="grid">
            <div className="card fade-in">
              <h3>🔧 混淆 (Obfuscation)</h3>
              <p>通过软件混淆技术使模型难以分析和修改。优点是效率高、实现简单，但安全性基于"模糊性"，易被专业逆向工程师破解。</p>
            </div>
            <div className="card fade-in">
              <h3>🔍 指纹 (Fingerprinting)</h3>
              <p>通过在模型中嵌入独特的、秘密的(key, response)对，实现所有权认证和违规检测。OML 1.0是其具体实现，侧重效率和"次日安全"。</p>
            </div>
            <div className="card fade-in">
              <h3>🔒 可信执行环境 (TEEs)</h3>
              <p>利用硬件安全飞地保护模型在不受信任机器上的执行。提供强大的安全性和效率，但依赖硬件厂商信任和设备兼容性。</p>
            </div>
            <div className="card fade-in">
              <h3>🔐 密码学 (Cryptography)</h3>
              <p>如全同态加密(FHE)、同态加密(HE)和函数式加密(FE)。提供可证明的最高安全保障，但计算开销巨大，目前对大型模型不切实际。</p>
            </div>
          </div>

          <div className="card fade-in">
            <h3>Sentient协议 (OML 1.0核心)</h3>
            <p>Sentient协议是OML 1.0中用于模型分发、使用和验证的核心协议，涉及模型所有者、模型托管方和验证者（Prover）。通过AI原生密码学，将后门攻击转化为模型指纹，实现模型所有权认证。</p>
          </div>
        </div>
      </section>

      {/* 架构图 */}
      <section id="architecture" className="section">
        <div className="container">
          <h2 className="section-title">技术架构</h2>

          <div className="diagram-container fade-in">
            <h4>OML技术架构分层图</h4>
            <div className="mermaid">
              {`graph TD
    subgraph 基础设施层
        Infra_HW[硬件]
        Infra_OS[操作系统]
        Infra_BC[区块链网络]
    end

    subgraph 安全机制层
        Sec_Obf[混淆] -->|提供模糊性安全| Infra_OS
        Sec_FP[指纹] -->|嵌入模型| OML_M
        Sec_TEE[可信执行环境] -->|硬件隔离执行| Infra_HW
        Sec_Crypto[密码学] -->|加密计算/验证| Infra_OS
    end

    subgraph OML模型层
        OML_M[OML格式模型] -->|包含| Sec_Obf
        OML_M -->|包含| Sec_FP
        OML_M -->|可运行于| Sec_TEE
        OML_M -->|可基于| Sec_Crypto
    end

    subgraph 应用层
        App_Host[模型托管方服务] -->|使用| OML_M
        App_Sentient[Sentient平台] -->|分发/验证| OML_M
        App_Sentient -->|交互| Sec_FP
        App_Sentient -->|交互| Infra_BC
    end

    subgraph 用户层
        User[用户] -->|请求服务| App_Host
        User -->|获取权限| App_Sentient
    end

    App_Host -->|数据流/控制流| OML_M
    App_Sentient -->|控制流| App_Host
    OML_M -->|数据流/控制流| Sec_Obf
    OML_M -->|数据流/控制流| Sec_FP
    OML_M -->|数据流/控制流| Sec_TEE
    OML_M -->|数据流/控制流| Sec_Crypto

    style User fill:#f9f,stroke:#333,stroke-width:2px
    style App_Host fill:#bbf,stroke:#333,stroke-width:2px
    style App_Sentient fill:#bbf,stroke:#333,stroke-width:2px
    style OML_M fill:#ccf,stroke:#333,stroke-width:2px
    style Sec_Obf fill:#cff,stroke:#333,stroke-width:2px
    style Sec_FP fill:#cff,stroke:#333,stroke-width:2px
    style Sec_TEE fill:#cff,stroke:#333,stroke-width:2px
    style Sec_Crypto fill:#cff,stroke:#333,stroke-width:2px
    style Infra_HW fill:#eee,stroke:#333,stroke-width:2px
    style Infra_OS fill:#eee,stroke:#333,stroke-width:2px
    style Infra_BC fill:#eee,stroke:#333,stroke-width:2px`}
            </div>
          </div>

          <div className="diagram-container fade-in">
            <h4>OML安全属性关系图</h4>
            <div className="mermaid">
              {`graph TD
    subgraph OML核心安全属性
        A[开放访问]
        B[可货币化]
        C[忠诚]
    end

    subgraph 实现机制
        D[OMLize转换函数] --> A
        D --> B
        D --> C
        E[权限令牌] --> B
        E --> C
        F[预先授权强制执行] --> C
        G[AI原生指纹] --> B
        G --> C
        H[可信执行环境 TEE] --> A
        H --> B
        H --> C
        I[密码学] --> A
        I --> B
        I --> C
        J[混淆] --> A
        J --> B
        J --> C
    end

    A -- 确保 --> K[数据隐私]
    A -- 确保 --> L[本地执行]
    B -- 确保 --> M[细粒度收益]
    C -- 确保 --> N[防止滥用]
    C -- 确保 --> O[遵守规则]

    style A fill:#e0ffff,stroke:#333,stroke-width:2px
    style B fill:#e0ffff,stroke:#333,stroke-width:2px
    style C fill:#e0ffff,stroke:#333,stroke-width:2px
    style D fill:#f0fff0,stroke:#333,stroke-width:2px
    style E fill:#f0fff0,stroke:#333,stroke-width:2px
    style F fill:#f0fff0,stroke:#333,stroke-width:2px
    style G fill:#f0fff0,stroke:#333,stroke-width:2px
    style H fill:#f0fff0,stroke:#333,stroke-width:2px
    style I fill:#f0fff0,stroke:#333,stroke-width:2px
    style J fill:#f0fff0,stroke:#333,stroke-width:2px
    style K fill:#fff0f5,stroke:#333,stroke-width:2px
    style L fill:#fff0f5,stroke:#333,stroke-width:2px
    style M fill:#fff0f5,stroke:#333,stroke-width:2px
    style N fill:#fff0f5,stroke:#333,stroke-width:2px
    style O fill:#fff0f5,stroke:#333,stroke-width:2px`}
            </div>
          </div>
        </div>
      </section>

      {/* 流程图 */}
      <section id="flow" className="section">
        <div className="container">
          <h2 className="section-title">核心流程</h2>

          <div className="diagram-container fade-in">
            <h4>OMLize过程示意图</h4>
            <div className="mermaid">
              {`graph TD
    subgraph 用户端
        U[用户] -->|请求授权| P[授权平台]
        U -->|输入x, 权限令牌p_x| OML_M[OML格式模型]
    end

    subgraph 授权平台
        P -->|验证/支付| P_Auth[授权服务]
        P_Auth -->|生成p_x| P_Token[权限令牌生成器]
        P_Token -->|返回p_x| U
    end

    subgraph 模型所有者/OMLize过程
        M_Orig[原始AI模型M] -->|OMLize函数| OML_Process[OMLize过程]
        OML_Process -->|嵌入验证逻辑| OML_M
        OML_M -->|内部验证p_x| OML_Verify[验证模块]
        OML_Verify -- 验证通过 --> OML_Compute[模型核心计算]
        OML_Compute -->|输出y| U
        OML_Verify -- 验证失败 --> OML_Invalid[输出无用结果]
        OML_Invalid -->|输出无用结果| U
    end

    subgraph 关键要素
        k_own[所有者密钥] --> P_Token
        h_func[哈希函数h] --> P_Token
        p_x_token[权限令牌p_x] --> OML_Verify
    end

    style U fill:#f9f,stroke:#333,stroke-width:2px
    style P fill:#bbf,stroke:#333,stroke-width:2px
    style OML_M fill:#ccf,stroke:#333,stroke-width:2px
    style OML_Verify fill:#fcf,stroke:#333,stroke-width:2px
    style OML_Compute fill:#cfc,stroke:#333,stroke-width:2px
    style OML_Invalid fill:#fcc,stroke:#333,stroke-width:2px
    style k_own fill:#ffc,stroke:#333,stroke-width:2px
    style h_func fill:#ffc,stroke:#333,stroke-width:2px
    style p_x_token fill:#ffc,stroke:#333,stroke-width:2px
    style P_Auth fill:#eef,stroke:#333,stroke-width:2px
    style P_Token fill:#eef,stroke:#333,stroke-width:2px
    style M_Orig fill:#eee,stroke:#333,stroke-width:2px
    style OML_Process fill:#ddd,stroke:#333,stroke-width:2px`}
            </div>
          </div>

          <div className="diagram-container fade-in">
            <h4>Sentient协议交互流程</h4>
            <div className="mermaid">
              {`sequenceDiagram
    participant U as 用户
    participant H as 模型托管方
    participant SP as Sentient平台
    participant P as 验证者(Prover)

    Note over U,H: 正常使用场景
    U->>H: 查询请求 (q)
    H->>SP: 请求权限字符串 (q)
    SP-->>H: 返回签名权限字符串 (σ(q))
    H->>H: 使用 OMLized 模型 (M.oml) 执行推理 (q, σ(q))
    H-->>U: 返回推理结果 (M.oml(q))

    Note over P,SP: 违规检测场景
    P->>H: 发送特殊查询 (q̃)
    H-->>P: 返回响应 (r̃)
    P->>SP: 提交 key-response 对 (q̃, r̃)
    SP->>SP: 检查托管方是否有 σ(q̃)
    alt 托管方有 σ(q̃)
        SP-->>P: 确认合规，无操作
    else 托管方无 σ(q̃)
        SP->>SP: 验证 r̃ 是否匹配 M.oml(q̃) (通过指纹)
        alt 匹配
            SP->>H: 声明违规并施加惩罚
        else 不匹配
            SP-->>P: 确认无违规，无操作
        end
    end`}
            </div>
          </div>
        </div>
      </section>

      {/* 模块图 */}
      <section id="modules" className="section">
        <div className="container">
          <h2 className="section-title">模块拆解</h2>

          <div className="diagram-container fade-in">
            <h4>OML模型内部模块结构</h4>
            <div className="mermaid">
              {`graph TD
    subgraph OML格式模型
        A[输入层] --> B[预处理模块]
        B --> C[权限验证模块]
        C --> D[核心AI模型M]
        D --> E[后处理模块]
        E --> F[输出层]

        subgraph 权限验证模块
            C1[令牌解析与验证] --> C2[验证逻辑]
            C2 --> C3[验证结果]
        end

        subgraph 核心AI模型M
            direction TB
            D1[模型层]
            D2[模型权重/参数]
            D3[指纹嵌入层]
            D1 --> D2
            D2 --> D3
        end

        subgraph 安全增强模块
            G1[代码混淆层]
            G2[TEE封装层]
            G3[加密计算层]
        end

        B --> G1
        D --> G2
        D --> G3

        C3 -- 验证失败 --> H[错误处理/无效输出]
        H --> F
    end

    style A fill:#f0f8ff,stroke:#333,stroke-width:2px
    style B fill:#e0ffff,stroke:#333,stroke-width:2px
    style C fill:#ffe4e1,stroke:#333,stroke-width:2px
    style D fill:#f0fff0,stroke:#333,stroke-width:2px
    style E fill:#e6e6fa,stroke:#333,stroke-width:2px
    style F fill:#f0f8ff,stroke:#333,stroke-width:2px
    style C1 fill:#fff0f5,stroke:#333,stroke-width:1px
    style C2 fill:#fff0f5,stroke:#333,stroke-width:1px
    style C3 fill:#fff0f5,stroke:#333,stroke-width:1px
    style D1 fill:#f5fffa,stroke:#333,stroke-width:1px
    style D2 fill:#f5fffa,stroke:#333,stroke-width:1px
    style D3 fill:#f5fffa,stroke:#333,stroke-width:1px
    style G1 fill:#fdf5e6,stroke:#333,stroke-width:2px
    style G2 fill:#fdf5e6,stroke:#333,stroke-width:2px
    style G3 fill:#fdf5e6,stroke:#333,stroke-width:2px
    style H fill:#ffc0cb,stroke:#333,stroke-width:2px`}
            </div>
          </div>

          <div className="card fade-in">
            <h3>模块功能说明</h3>
            <table>
              <thead>
                <tr>
                  <th>模块</th>
                  <th>功能</th>
                  <th>安全级别</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>权限验证模块</td>
                  <td>解析和验证权限令牌，确保授权访问</td>
                  <td>高</td>
                </tr>
                <tr>
                  <td>核心AI模型</td>
                  <td>执行主要的AI推理任务，嵌入指纹</td>
                  <td>中</td>
                </tr>
                <tr>
                  <td>安全增强模块</td>
                  <td>提供额外的安全保护层</td>
                  <td>高</td>
                </tr>
                <tr>
                  <td>错误处理模块</td>
                  <td>处理验证失败情况，输出无效结果</td>
                  <td>中</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 限制与未来 */}
      <section id="limitations" className="section">
        <div className="container">
          <h2 className="section-title">限制与未来方向</h2>
          
          <div className="grid">
            <div className="card fade-in">
              <h3>⚠️ 当前限制</h3>
              <ul>
                <li><strong>效率开销</strong>：TEE和密码学方法引入显著计算延迟</li>
                <li><strong>安全性局限</strong>：混淆提供"模糊性安全"；指纹依赖保密性</li>
                <li><strong>实用性与可扩展性</strong>：TEE需要兼容硬件；指纹容量是开放问题</li>
              </ul>
            </div>
            <div className="card fade-in">
              <h3>🚀 未来方向</h3>
              <ul>
                <li><strong>更鲁棒、高效的OML设计</strong>：探索结合密码学、AI原生和经济社会机制</li>
                <li><strong>指纹技术改进</strong>：研究更有效的抗遗忘技术、增强指纹持久性</li>
                <li><strong>TEE技术普及与集成</strong>：随着GPU上TEE技术的发展</li>
                <li><strong>激励对齐的生态系统</strong>：构建多层次、基于区块链的端到端协议</li>
              </ul>
            </div>
          </div>

          <div className="card fade-in">
            <h3>实验验证结果</h3>
            <p>基于Mistral-7B的实验表明：</p>
            <ul>
              <li>通过权重平均，可以在嵌入多达1024个指纹的情况下，仍保持高效用</li>
              <li>指纹对良性微调具有相对鲁棒性，增加指纹数量可提高存活率</li>
              <li>通过"提示词增强"训练可提高指纹对系统提示词的鲁棒性</li>
              <li>针对联合攻击提出了理论证明的防御机制</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 参考资料 */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">参考资料与致谢</h2>
          
          <div className="card fade-in">
            <h3>📄 原始论文</h3>
            <p><strong>标题</strong>: Reclaiming "Open AI" - AI Model Serving Can Be Open Access, Yet Monetizable and Loyal</p>
            <p><strong>链接</strong>: <a href="https://arxiv.org/pdf/2411.03887" target="_blank" className="highlight">https://arxiv.org/pdf/2411.03887</a></p>
            <p><strong>发布时间</strong>: 2024年11月</p>
            <p><strong>页数</strong>: 54页</p>
          </div>

          <div className="card fade-in">
            <h3>🏷️ 关键术语</h3>
            <div className="grid">
              <div>
                <strong>OML</strong>: Open-access, Monetizable, and Loyal<br/>
                <strong>M.oml</strong>: OML-formatted Model<br/>
                <strong>OMLize</strong>: 将原始AI模型转换为OML格式的函数<br/>
                <strong>TEE</strong>: Trusted Execution Environment<br/>
                <strong>FHE</strong>: Fully Homomorphic Encryption
              </div>
            </div>
          </div>

          <div className="card fade-in">
            <h3>🙏 致谢</h3>
            <p>感谢论文作者团队的杰出研究工作，为AI模型服务的未来发展提供了重要的理论基础和技术路径。本解读网站旨在帮助更多人理解OML范式的核心思想和技术细节。</p>
          </div>
          
          <div className="card fade-in">
            <h3>🚀创作者</h3>
            <p>Captain(@mycndota)</p>
          </div>
        </div>
      </section>

      {/* 回到顶部按钮 */}
      <button 
        className={`back-to-top ${backToTopVisible ? 'visible' : ''}`} 
        onClick={scrollToTop}
      >
        ↑
      </button>
    </>
  )
}

export default App

