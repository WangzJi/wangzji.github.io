
// dataService.js

class DataService {
    constructor() {
        this.posts = [];
    }

    async fetchPosts() {
        if (this.posts.length > 0) {
            return this.posts;
        }

        try {
            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.posts = await response.json();
            return this.posts;
        } catch (error) {
            console.warn('Failed to fetch posts, using fallback data:', error);
            this.posts = [
                {
                    "id": 8,
                    "file": "posts/hadoop-complete-guide-part1.md",
                    "title": "Hadoop 完全指南（一）：从零开始深入理解大数据生态核心基座",
                    "excerpt": "从 0 到 1 深入解析 Hadoop 核心架构，涵盖 HDFS、YARN、MapReduce 运行原理与生产实践经验。",
                    "category": "backend",
                    "tags": ["Hadoop", "Big Data", "Distributed Systems", "Java"],
                    "date": "2026-01-12",
                    "readTime": "35 min read",
                    "author": "Eric Wang"
                },
                {
                    "id": 9,
                    "file": "posts/Seata-RM-Module-Analysis.md",
                    "title": "深入解析Seata RM模块：资源管理器的核心机制与实践",
                    "excerpt": "详细拆解 Seata RM 模块的工作流程，分析其如何代理数据源并与 TC 交互以完成分布式事务的两阶段提交。",
                    "category": "backend",
                    "tags": ["Seata", "RM", "Distributed Transactions", "Source Code"],
                    "date": "2024-02-01",
                    "readTime": "20 min read",
                    "author": "Eric Wang"
                },
                {
                    "id": 7,
                    "file": "posts/seata-tm-module-complete-analysis.md",
                    "title": "深入解析Seata TM模块：分布式事务管理器的设计与实现",
                    "excerpt": "深入分析Seata框架中TM（Transaction Manager）模块的架构设计、核心实现和扩展机制，探讨分布式事务管理的最佳实践。",
                    "category": "backend",
                    "tags": ["Seata", "分布式事务", "微服务", "Java"],
                    "date": "2024-01-20",
                    "readTime": "25 min read",
                    "author": "Eric Wang"
                }
            ];
            return this.posts;
        }
    }

    async getPostById(id) {
        const posts = await this.fetchPosts();
        // Use loose equality to match string IDs from URL
        const postInfo = posts.find(p => p.id == id);

        if (!postInfo) {
            return null;
        }

        try {
            let content;
            if (postInfo.file) {
                try {
                    const response = await fetch(postInfo.file);
                    if (response.ok) {
                        content = await response.text();
                    } else {
                        throw new Error(`Status ${response.status}`);
                    }
                } catch (fetchError) {
                    // Fallback logic for specific IDs when fetch fails
                    if (postInfo.id == 8) {
                        content = this.getFallbackHadoopContent();
                    } else if (postInfo.id == 7) {
                        content = this.getFallbackSeataContent();
                    } else if (postInfo.id == 9) {
                        content = this.getFallbackSeataRMContent();
                    } else {
                        content = `# ${postInfo.title}\n\n> [!WARNING]\n> **本地预览限制**\n> \n> 由于浏览器的安全策略（CORS），本地直接打开 HTML 文件无法加载外部 Markdown 文件。\n> \n> 请使用以下方式之一查看完整内容：\n> 1. 使用 VS Code 的 **Live Server** 插件运行。\n> 2. 在项目根目录运行 \`python3 -m http.server\`。\n> 3. 将项目部署到 GitHub Pages。\n\n## 文章摘要\n\n${postInfo.excerpt}`;
                    }
                }
            } else {
                content = postInfo.content || '';
            }
            return { ...postInfo, content };
        } catch (error) {
            console.error(`Failed to fetch post content for id ${id}:`, error);
            return null;
        }
    }

    async getSeataArticleContent() {
        try {
            console.log('Attempting to load Seata markdown file...');
            const response = await fetch('posts/seata-tm-module-complete-analysis.md');
            
            if (!response.ok) {
                console.warn(`Failed to load Seata markdown file: ${response.status} ${response.statusText}`);
                return this.getFallbackSeataContent();
            }
            
            const content = await response.text();
            console.log('Successfully loaded Seata article content, length:', content.length);
            
            if (!content || content.trim().length === 0) {
                console.warn('Loaded content is empty, using fallback');
                return this.getFallbackSeataContent();
            }
            
            return content;
            
        } catch (error) {
            console.error('Error loading Seata markdown file:', error);
            return this.getFallbackSeataContent();
        }
    }

    getFallbackHadoopContent() {
        return `# Hadoop 完全指南（一）：从零开始深入理解大数据生态核心基座

> [!NOTE]
> **预览模式**
> 您正在查看此文章的本地预览版本。完整内容包含详细的生产环境配置和调优指南，请部署后查看。

## 前言

在大数据技术日新月异的今天，Hadoop 依然是整个生态系统的基石。无论是数据湖的构建，还是离线数仓的计算，Hadoop 都在其中扮演着不可替代的角色。本文将带你深入 Hadoop 的核心，从架构设计到运行原理，彻底搞懂这个大数据基座。

## 1. Hadoop 核心组件架构

Hadoop 的核心由三个部分组成：**HDFS**（存储）、**YARN**（调度）和 **MapReduce**（计算）。

\`\`\`mermaid
graph TB
    subgraph HadoopCore["Hadoop Core"]
        direction TB
        HDFS["HDFS<br/>分布式文件系统"]
        YARN["YARN<br/>资源管理器"]
        MapReduce["MapReduce<br/>分布式计算框架"]
    end
    
    subgraph StorageLayer["Storage Layer"]
        direction TB
        NameNode["NameNode<br/>元数据管理"]
        DataNodes["DataNodes<br/>数据存储节点"]
    end
    
    subgraph ComputingLayer["Computing Layer"]
        direction TB
        ResourceManager["ResourceManager<br/>资源调度"]
        NodeManagers["NodeManagers<br/>节点管理"]
    end

    HDFS -.-> NameNode
    NameNode --> DataNodes
    
    YARN -.-> ResourceManager
    ResourceManager --> NodeManagers
    
    MapReduce --> YARN
    MapReduce --> HDFS
\`\`\`

## 2. HDFS：分布式文件系统

HDFS (Hadoop Distributed File System) 采用了主从架构（Master/Slave）。

### 2.1 核心角色

- **NameNode (Master)**: 掌管文件系统的目录树，处理客户端的读写请求。
- **DataNode (Slave)**: 实际存储数据块（Block），执行数据读写操作。
- **Secondary NameNode**: 辅助 NameNode 进行元数据合并（Checkpoint），并非热备。

## 3. MapReduce：编程模型

MapReduce 的思想源于 Google 的同名论文，将计算任务拆分为 **Map**（映射）和 **Reduce**（归约）两个阶段。

### WordCount 示例逻辑

1. **Input**: \`hello world hello java\`
2. **Map**: \`{hello: 1, world: 1, hello: 1, java: 1}\`
3. **Shuffle**: \`{hello: [1, 1], world: [1], java: [1]}\`
4. **Reduce**: \`{hello: 2, world: 1, java: 1}\`

## 4. YARN：资源调度利器

YARN (Yet Another Resource Negotiator) 的出现解耦了资源管理和计算框架。

- **ResourceManager**: 全局资源管理器。
- **NodeManager**: 单机资源代理。
- **ApplicationMaster**: 负责单个应用程序的生命周期。

---

*更多详细内容（包括 HDFS 读写流程源码分析、YARN 调度策略配置等）请在完整版中查看。*`;
    }

    getFallbackSeataRMContent() {
        return `# 深入解析 Seata RM 模块：资源管理器的核心机制与实践

## 1. RM 的核心角色

在 Seata 的架构中，**RM (Resource Manager)** 负责管理分支事务处理的资源，与 TC 通信以注册分支事务和报告分支事务的状态，并驱动分支事务的提交或回滚。

## 2. 关键交互流程

RM 与其他组件的交互是理解 Seata 工作原理的关键。

\`\`\`mermaid
sequenceDiagram
    participant TM
    participant TC
    participant RM
    participant DB

    TM->>TC: 开启全局事务 (Global Begin)
    TC-->>TM: 返回 XID
    TM->>RM: 调用微服务 (带 XID)
    RM->>RM: 拦截 SQL 执行
    RM->>TC: 注册分支事务 (Branch Register)
    TC-->>RM: 返回 Branch ID
    RM->>DB: 执行本地事务 (Commit)
    RM->>TC: 报告分支状态 (Branch Report)
\`\`\`

## 3. 数据源代理 (DataSource Proxy)

Seata 对数据源进行了封装，在底层通过代理模式拦截 JDBC 操作，从而在业务代码无感知的情况下插入了分布式事务逻辑。

> 完整源码分析和 AT 模式下的 Undo Log 生成机制请查看在线完整版。`;
    }

    getFallbackSeataContent() {
        // 如果无法加载markdown文件，使用简化版本的内容
        return `# 深入解析 Seata TM 模块：分布式事务管理器的设计与实现

> [!TIP]
> **本地预览版**
> 这是一个精简的预览版本。完整内容包含详细的源码分析和设计模式讲解。

## 前言

在微服务架构中，分布式事务是一个绕不开的技术挑战。Seata作为阿里巴巴开源的分布式事务解决方案，通过TC、TM、RM三大组件协同工作，优雅地解决了跨服务的数据一致性问题。

## 核心架构

Seata 的 TM 模块负责定义全局事务的边界。

\`\`\`mermaid
flowchart LR
    Client[业务客户端] --> TM[事务管理器<br>Transaction Manager]
    TM -->|1. Begin| TC[事务协调器<br>Transaction Coordinator]
    TM -->|2. Commit/Rollback| TC
    TC -->|3. Notify| RM[资源管理器<br>Resource Manager]
\`\`\`

### 核心职责

1. **事务边界定义**：通过 \`@GlobalTransactional\` 注解。
2. **生命周期管理**：Begin, Commit, Rollback。
3. **异常处理**：决定回滚策略。

---
*完整版包含 DefaultGlobalTransaction 源码逐行分析。*`;
    }

    async getRelatedPosts(currentPost) {
        const allPosts = await this.fetchPosts();
        const related = allPosts
            .filter(post => 
                post.id !== currentPost.id && 
                (post.category === currentPost.category || 
                 post.tags.some(tag => currentPost.tags.includes(tag)))
            )
            .slice(0, 3);

        if (related.length > 0) {
            return related;
        } else {
            // Fallback to latest posts if no related posts found
            return allPosts
                .filter(post => post.id !== currentPost.id)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
        }
    }
}

// Export a single instance
const dataService = new DataService();
