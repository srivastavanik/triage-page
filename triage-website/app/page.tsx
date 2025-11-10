'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { SecurityHeatmap, CommitTimeline, VulnerabilityPipeline, TestExecution, PRWireframe } from '../components/SecurityHeatmap';
import { AutoUnitTests, GitActionsFlow, LiveDiffHighlight } from '../components/AnimatedWorkflow';
import { PlanVisual, CodeVisual, BuildVisual, ReviewVisual, ReleaseVisual, OperateVisual } from '../components/PhaseVisuals';
import { AllChecksPassed, FilesChanged, CodeDiffView, MergeStatus, DeploymentSuccess } from '../components/GitHubElements';

// Comprehensive IDE with Advanced Animations
const ComprehensiveIDE = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [gitAction, setGitAction] = useState('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const originalCode = "router.post('/trial', (req, res) => chatController.trialChat(req, res));";
  const fixedCode = "router.post('/trial', rateLimit({ max: 5 }), chatController.trialChat);";

  useEffect(() => {
    if (!isInView) {
      setAnimationPhase(0);
      setTypedText('');
      setGitAction('idle');
      return;
    }

    const runAnimation = async () => {
      // Phase 0: Scanning (tan highlight)
      setAnimationPhase(0);
      await new Promise(r => setTimeout(r, 2000));
      
      // Phase 1: Detection (flash, turn cyan)
      setAnimationPhase(1);
      await new Promise(r => setTimeout(r, 1500));
      
      // Phase 2: Fixing (typing)
      setAnimationPhase(2);
      for (let i = 0; i <= fixedCode.length; i++) {
        setTypedText(fixedCode.substring(0, i));
        await new Promise(r => setTimeout(r, 30));
      }
      
      // Phase 3: Fixed
      setAnimationPhase(3);
      await new Promise(r => setTimeout(r, 1500));
      
      // Git workflow
      setGitAction('commit');
      await new Promise(r => setTimeout(r, 1500));
      setGitAction('push');
      await new Promise(r => setTimeout(r, 1500));
      setGitAction('pr');
      await new Promise(r => setTimeout(r, 2000));
      
      // Reset
      setAnimationPhase(0);
      setTypedText('');
      setGitAction('idle');
    };

    const interval = setInterval(runAnimation, 16000);
    runAnimation();
    
    return () => clearInterval(interval);
  }, [isInView, fixedCode.length]);

  return (
    <div ref={ref} className="ide-full">
      {/* Top bar with Git controls */}
      <div className="ide-top-bar">
        <div className="ide-breadcrumb">
          <span className="breadcrumb-item">backend</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-item">src</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-item text-cyan">routes/auth.routes.ts</span>
        </div>
        <div className="ide-actions">
          <span className={`action-item ${gitAction === 'commit' ? 'active' : gitAction !== 'idle' ? 'done' : ''}`}>
            {gitAction === 'commit' ? '◉' : '○'} Commit
          </span>
          <span className={`action-item ${gitAction === 'push' ? 'active' : gitAction === 'pr' ? 'done' : ''}`}>
            ↑ Push
          </span>
          <span className={`action-item ${gitAction === 'pr' ? 'active' : ''}`}>
            ⌘ PR
          </span>
          <span className="action-item modified">● Modified</span>
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="ide-main">
        {/* Left sidebar */}
        <div className="ide-sidebar">
          <div className="sidebar-header">EXPLORER</div>
          <div className="sidebar-tree">
            <div className="tree-item">▸ .claude</div>
            <div className="tree-item expanded">▾ backend</div>
            <div className="tree-item nested">▸ scripts</div>
            <div className="tree-item nested expanded">▾ src</div>
            <div className="tree-item nested-2 expanded">▾ controllers</div>
            <div className="tree-item nested-3 warn">● chat.controller.ts</div>
            <div className="tree-item nested-2 expanded">▾ routes</div>
            <div className="tree-item nested-3 active warn">● auth.routes.ts</div>
            <div className="tree-item nested-3">chat.routes.ts</div>
            <div className="tree-item nested-2">▸ middleware</div>
            <div className="tree-item nested-2">▸ models</div>
            <div className="tree-item nested">▸ tests</div>
          </div>
        </div>

        {/* Center - Editor */}
        <div className="ide-center">
          <div className="ide-tabs">
            <div className="file-tab active">routes/auth.routes.ts</div>
            <div className="file-tab">chat.controller.ts</div>
          </div>

          <div className="ide-editor">
            <div className="editor-gutter">
              <div className="gutter-line">1</div>
              <div className="gutter-line">2</div>
              <div className="gutter-line">3</div>
              <div className="gutter-line">4</div>
              <div className="gutter-line">5</div>
              <div className="gutter-line">6</div>
              <div className="gutter-line">7</div>
              <div className="gutter-line highlight">8</div>
              <div className="gutter-line">9</div>
              <div className="gutter-line">10</div>
              <div className="gutter-line">11</div>
              <div className="gutter-line">12</div>
            </div>
            <div className="editor-code">
              <div className="editor-line">import {'{ Router }'} from 'express';</div>
              <div className="editor-line">import {'{ rateLimit }'} from 'express-rate-limit';</div>
              <div className="editor-line">import {'{ chatController }'} from '../controllers';</div>
              <div className="editor-line"></div>
              <div className="editor-line">const router = Router();</div>
              <div className="editor-line"></div>
              <div className="editor-line">// Trial chat endpoint (no auth required)</div>
              
              {/* Animated vulnerability line with highlight */}
              <div className="editor-line vulnerable-line">
                <span className={`code-content-highlight phase-${animationPhase}`}>
                  {animationPhase < 2 ? (
                    <span className="code-text-inner">
                      {originalCode}
                    </span>
                  ) : (
                    <span className="code-text-inner fixed-code">
                      {typedText}
                      {animationPhase === 2 && typedText.length < fixedCode.length && <span className="typing-cursor">|</span>}
                    </span>
                  )}
                </span>
              </div>
              
              <div className="editor-line"></div>
              <div className="editor-line">// Protected routes</div>
              <div className="editor-line">router.use(authenticate);</div>
              <div className="editor-line">router.post('/chat', chatController.create);</div>
            </div>
          </div>
        </div>

        {/* Right panel - Security */}
        <div className="ide-right-panel">
          <div className="panel-tabs">
            <div className="panel-tab">Problems</div>
            <div className="panel-tab active">Security</div>
          </div>
          <div className="panel-content">
            <div className="panel-stat">
              <span className="stat-count">3</span>
              <span className="stat-label">security</span>
              <span className="stat-divider">●</span>
              <span className="stat-label">0 lint</span>
            </div>

            <div className="issues-list">
              <div className="issue-item active">
                <div className="issue-header">
                  <span className="issue-icon">◉</span>
                  <span className="issue-line">Line 8</span>
                  <span className="issue-severity severity-high">HIGH</span>
                </div>
                <div className="issue-text">Unauthenticated endpoint with abuse potential</div>
              </div>
              <div className="issue-item">
                <div className="issue-header">
                  <span className="issue-icon">◉</span>
                  <span className="issue-line">Line 16</span>
                  <span className="issue-severity severity-medium">MED</span>
                </div>
                <div className="issue-text">Inconsistent parameter naming</div>
              </div>
            </div>

            {/* Security Assistant */}
            <div className="assistant-panel">
              <div className="assistant-panel-header">
                <span className="text-cyan">∞</span>
                <span>Triage Assistant</span>
                <span className="info-badge">RLHF</span>
              </div>
              <div className="assistant-panel-body">
                <div className="panel-suggestion">
                  Add rate limiting to prevent trial endpoint abuse
                </div>
                <div className="panel-rlhf">
                  <div className="rlhf-indicator">∞</div>
                  <div className="rlhf-content">
                    Pattern learned from 2,847 similar patches merged in your org
                  </div>
                </div>
                {animationPhase === 3 && (
                  <motion.div 
                    className="panel-fix-applied"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Fix applied and verified
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ide-bottom-bar">
        <div className="bottom-stat">Ln 8, Col 1</div>
        <div className="bottom-stat">UTF-8</div>
        <div className="bottom-stat">TypeScript</div>
        <div className="bottom-stat git-status">
          {gitAction === 'idle' && <span>◉ Triage Active</span>}
          {gitAction === 'commit' && <span className="text-cyan">◉ Committing...</span>}
          {gitAction === 'push' && <span className="text-cyan">↑ Pushing...</span>}
          {gitAction === 'pr' && <span className="text-cyan">✓ PR #247 Opened</span>}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const codeY = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan via-pale-wood to-cyan z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 backdrop-blur-dark border-b border-border">
        <div className="container-max">
          <div className="flex items-center justify-between h-[72px]">
          <Image
              src="/triage.png"
            alt="Triage"
              width={120}
              height={32}
              className="h-8 w-auto"
              style={{ height: '32px', width: 'auto' }}
            />
            
            <div className="flex items-center gap-10">
              <div className="hidden md:flex items-center gap-8">
                <div className={`mega-dropdown ${dropdownOpen ? 'active' : ''}`}>
                  <button
                    className="dropdown-trigger"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  >
                    <span>Products</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  <div className="mega-dropdown-content">
                    <div className="mega-grid">
                      <div className="mega-section">
                        <h4 className="mega-section-title">Detection & Analysis</h4>
                        <Link href="/security-scanner" className="mega-item">
                          <span className="mega-icon">◉</span>
                          <div>
                            <div className="mega-item-title">Security Scanner</div>
                            <div className="mega-item-desc">AI-powered vulnerability detection across desktop, web, and backend</div>
                          </div>
                        </Link>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">◈</span>
                          <div>
                            <div className="mega-item-title">Code Graph Analysis</div>
                            <div className="mega-item-desc">Deep structure and data flow mapping</div>
                          </div>
                        </a>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">⌘</span>
                          <div>
                            <div className="mega-item-title">Golden Repository</div>
                            <div className="mega-item-desc">Organizational memory and learning signals</div>
                          </div>
                        </a>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">◬</span>
                          <div>
                            <div className="mega-item-title">Exploit Tracing</div>
                            <div className="mega-item-desc">Deterministic reproduction and verification</div>
                          </div>
                        </a>
                      </div>
                      <div className="mega-section">
                        <h4 className="mega-section-title">Automation & Patching</h4>
                        <Link href="/auto-patch" className="mega-item">
                          <span className="mega-icon">◆</span>
                          <div>
                            <div className="mega-item-title">Auto-Patch Generator</div>
                            <div className="mega-item-desc">Framework-aware security fixes</div>
                          </div>
                        </Link>
                        <Link href="/rlhf-learning" className="mega-item">
                          <span className="mega-icon">∞</span>
                          <div>
                            <div className="mega-item-title">RLHF Learning</div>
                            <div className="mega-item-desc">Continuous improvement from merged fixes</div>
                          </div>
                        </Link>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">◎</span>
                          <div>
                            <div className="mega-item-title">Policy Engine</div>
                            <div className="mega-item-desc">Smart auto-merge and routing</div>
                          </div>
                        </a>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">◐</span>
                          <div>
                            <div className="mega-item-title">Evidence Packets</div>
                            <div className="mega-item-desc">Complete context for reviewers</div>
                          </div>
                        </a>
                      </div>
                      <div className="mega-section">
                        <h4 className="mega-section-title">Platform & Deployment</h4>
                        <Link href="/cicd-integration" className="mega-item">
                          <span className="mega-icon">◑</span>
                          <div>
                            <div className="mega-item-title">CI/CD Integration</div>
                            <div className="mega-item-desc">GitHub, GitLab, Jenkins, CircleCI</div>
                          </div>
                        </Link>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">▣</span>
                          <div>
                            <div className="mega-item-title">IDE Extensions</div>
                            <div className="mega-item-desc">VS Code, IntelliJ, Sublime, Cursor</div>
                          </div>
                        </a>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">▤</span>
                          <div>
                            <div className="mega-item-title">VPC & Self-Hosted</div>
                            <div className="mega-item-desc">Private deployment options</div>
                          </div>
                        </a>
                        <a href="#" className="mega-item">
                          <span className="mega-icon">▥</span>
                          <div>
                            <div className="mega-item-title">API & SDKs</div>
                            <div className="mega-item-desc">REST, GraphQL, TypeScript, Python</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="mega-footer">
                      <div className="mega-footer-section">
                        <div className="footer-label">Ready to get started?</div>
                        <a href="#" className="footer-link">View documentation →</a>
                      </div>
                      <div className="mega-footer-section">
                        <div className="footer-label">Need help choosing?</div>
                        <a href="#" className="footer-link">Schedule a demo →</a>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/careers" className="nav-link">Careers</Link>
                <Link href="/team" className="nav-link">Team</Link>
              </div>
              <a 
                href="mailto:srivastavan@berkeley.edu"
                className="btn btn-primary"
                style={{ background: '#f6f4f1', color: '#0e3638' }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-[72px] relative overflow-hidden">
        {/* Abstract white bars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
            className="absolute top-1/4 left-0 h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #f6f4f1 50%, transparent 100%)' }}
          animate={{
              scaleX: [0, 1, 0],
              x: ['-100%', '0%', '100%']
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-1/3 right-0 h-px w-2/3"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #f6f4f1 100%)' }}
          animate={{
              scaleX: [0, 1],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
        
        <motion.div
          className="container-max w-full relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
          <motion.h1
                  className="mb-8 leading-[0.85]"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -50 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                <span className="highlight-solid-tan">Security that</span>
            <br />
                <span className="text-cyan">writes itself</span>
          </motion.h1>

          <motion.p
                  className="text-[20px] leading-[1.6] mb-12 max-w-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -50 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  AI-powered security that <span className="highlight-solid cyan text-cyan">embeds into your workflow</span>, finding and fixing vulnerabilities automatically through <span className="highlight-solid-tan">reinforcement learning</span>.
          </motion.p>

          <motion.div
                className="flex gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
                <a 
                  href="mailto:srivastavan@berkeley.edu"
                  className="btn btn-large hover:scale-105 transition-all"
                  style={{ background: '#f6f4f1', color: '#0e3638' }}
                >
                  Contact Us
                </a>
                <Link 
                  href="/team"
                  className="btn btn-large btn-secondary" 
                  style={{ borderColor: '#f6f4f1', color: '#f6f4f1' }}
                >
                  Meet the Team
                </Link>
          </motion.div>

              <motion.div 
                className="grid grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: mounted ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div>
                  <div className="text-[36px] font-mono text-cyan mb-1">156K</div>
                  <div className="text-caption">patches learned</div>
                </div>
                <div>
                  <div className="text-[36px] font-mono text-cyan mb-1">94%</div>
                  <div className="text-caption">merge rate</div>
                </div>
                <div>
                  <div className="text-[36px] font-mono text-cyan mb-1">8.9M</div>
                  <div className="text-caption">learning signals</div>
                </div>
          </motion.div>
        </div>

        <motion.div
              style={{ y: codeY }}
              className="relative"
        >
          <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ComprehensiveIDE />
               </motion.div>
          </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Logo Carousel */}
      <section className="py-20 bg-secondary border-y border-pale-wood/10 overflow-hidden">
        <div className="container-max">
          <p className="text-center text-[12px] text-pale-wood/40 mb-12 uppercase tracking-widest font-mono">
            Trusted by engineers at
          </p>
          <div className="logo-carousel">
          <motion.div
              className="logo-track"
              animate={{ x: [0, -1800] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[
                'Berkeley.png', 'stanford-bw-logo.png', 'Nyu_short_black.svg (1) (1).png',
                'amazon-logo-black-transparent-1.png', 'novita-ai-logo-png_seeklogo-611671 (1).png',
                '711c05d6-a57a-4567-bdf6-1649d03a68a6.png', 'ee1a22e0-bf8f-4c49-8728-4fc9ef1a7fbe (1).png',
                '62f3a322559f1b57bbc8998fae009d42.png', 'image-ebaf55a8-a29f-4b96-a4dd-511a1b997a9f.png'
              ].concat([
                'Berkeley.png', 'stanford-bw-logo.png', 'Nyu_short_black.svg (1) (1).png',
                'amazon-logo-black-transparent-1.png', 'novita-ai-logo-png_seeklogo-611671 (1).png',
                '711c05d6-a57a-4567-bdf6-1649d03a68a6.png', 'ee1a22e0-bf8f-4c49-8728-4fc9ef1a7fbe (1).png',
                '62f3a322559f1b57bbc8998fae009d42.png', 'image-ebaf55a8-a29f-4b96-a4dd-511a1b997a9f.png'
              ]).map((logo, i) => (
                <div key={i} className="logo-item">
                  <Image src={`/user_logos/${logo}`} alt="Customer logo" width={120} height={40} className="logo-img" />
                </div>
              ))}
              </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        {/* Abstract white bars */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.div
            className="absolute top-20 left-0 h-px w-1/2"
            style={{ background: 'linear-gradient(90deg, #f6f4f1 0%, transparent 100%)' }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 right-0 h-px w-1/3"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #f6f4f1 100%)' }}
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
        <div className="container-max relative z-10">
          <div className="text-center mb-20">
            <h2 className="reveal mb-6">
              <span className="text-highlight in-view">Native placement</span> in the lifecycle
            </h2>
            <p className="reveal text-[20px] text-pale-wood/70 max-w-3xl mx-auto">
              Security embedded at every stage of development - from planning to production
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {[
              {
                num: '01',
                title: 'Plan',
                desc: 'Risk-aware backlog generation from code graphs and recent diffs'
              },
              {
                num: '02',
                title: 'Code',
                desc: 'Inline security hints and framework-aware patch suggestions'
              },
              {
                num: '03',
                title: 'Build & Test',
                desc: 'Deterministic repro and verification as first-class CI jobs'
              },
              {
                num: '04',
                title: 'Review',
                desc: 'Pull requests with complete evidence packets and rationales'
              },
              {
                num: '05',
                title: 'Release',
                desc: 'Policy-aware auto-merge with structured sign-off flow'
              },
              {
                num: '06',
                title: 'Operate',
                desc: 'Post-merge validation feeding learning signals back'
              }
            ].map((phase, i) => (
              <motion.div
                key={i}
                className="lifecycle-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="lifecycle-num">{phase.num}</div>
                <h3 className="lifecycle-title">{phase.title}</h3>
                <p className="lifecycle-desc">{phase.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-20">
            <div className="reveal">
              <div className="visual-label">Automated patch generation</div>
              <CodeDiffView />
            </div>
            <div className="reveal">
              <div className="visual-label">Files modified</div>
              <FilesChanged />
            </div>
          </div>

          <div className="reveal mt-12">
            <div className="visual-label">Security verification</div>
            <AllChecksPassed />
          </div>
        </div>
      </section>

      {/* What Embedded Security Means */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <div className="max-w-5xl mx-auto">
            <h2 className="reveal mb-12 text-center">Embedded Security, For Everyone</h2>
            
            <div className="space-y-8 text-[18px] leading-[1.9]">
              <p className="reveal">
                Triage treats security as a <span className="highlight-solid cyan text-cyan">built-in property of software</span>, not an afterthought. "Embedded security" means the system sits inside everyday engineering loops so that discovery, reproduction, patching, verification, and shipping occur where work already happens.
              </p>
              
              <p className="reveal">
                "Security for everyone" means <span className="highlight-solid-tan text-pale-wood">any contributor can understand, act on, and verify</span> a finding without becoming a specialist. The platform's agents learn from each team's actual behavior, so <span className="highlight-solid cyan text-cyan">evidence quality, patch precision, and merge rates improve over time</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RLHF Learning */}
      <section className="section-padding relative overflow-hidden">
        {/* White bar accents */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <motion.div
            className="absolute top-40 right-0 w-1/4 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #f6f4f1 100%)' }}
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 2 }}
          />
        </div>
        <div className="container-max relative z-10">
          <div className="text-center mb-20">
            <h2 className="reveal mb-6">
              <span className="text-highlight in-view">Reinforcement learning</span> from human feedback
              </h2>
            <p className="reveal text-[20px] text-pale-wood/70 max-w-3xl mx-auto">
              Every <span className="highlight-solid cyan text-cyan">merged fix, reviewer comment, and security approval</span> trains the system to be more precise for your organization
            </p>
          </div>

          <div className="reveal mb-20">
            <CommitTimeline />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div className="reveal space-y-8">
              <h3 className="text-[28px] mb-8" style={{ color: '#f6f4f1' }}>
                <span className="highlight-solid-tan">Learning signals</span> captured
              </h3>
              {[
                { signal: 'Merged patches without edits', weight: 95, desc: 'Primary signal for patch quality' },
                { signal: 'Reviewer style preferences', weight: 87, desc: 'Adapts to team conventions' },
                { signal: 'Test stability across versions', weight: 92, desc: 'Improves reproducibility' },
                { signal: 'Incident correlation', weight: 78, desc: 'Links production issues to fixes' }
                ].map((item, i) => (
                <div key={i} className="signal-row">
                  <div className="signal-name">{item.signal}</div>
                  <div className="signal-desc">{item.desc}</div>
                  <motion.div
                    className="signal-progress"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: item.weight / 100 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    style={{ transformOrigin: 'left' }}
                  >
                    <span className="signal-percentage">{item.weight}%</span>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="reveal space-y-8">
              <h3 className="text-[28px] mb-8">
                <span className="highlight-solid cyan text-cyan">Measurable</span> improvements
              </h3>
              {[
                { metric: 'Patch acceptance rate', before: '67%', after: '94%', improve: '+27%', desc: 'More PRs merged without changes' },
                { metric: 'Lines changed per fix', before: '142', after: '23', improve: '84% smaller', desc: 'Minimal, precise patches' },
                { metric: 'False positive rate', before: '23%', after: '< 1%', improve: '96% reduction', desc: 'Only real vulnerabilities' },
                { metric: 'Mean time to fix', before: '4.2 days', after: '2.3 hours', improve: '95% faster', desc: 'Automated remediation' }
              ].map((item, i) => (
                <div key={i} className="improvement-card">
                  <div className="improvement-metric">{item.metric}</div>
                  <div className="improvement-comparison">
                    <span className="comp-before">{item.before}</span>
                    <span className="comp-arrow">→</span>
                    <span className="comp-after">{item.after}</span>
                  </div>
                  <div className="improvement-desc">{item.desc}</div>
                  <div className="improvement-badge">{item.improve}</div>
                </div>
                ))}
              </div>
            </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="reveal">
              <div className="visual-label">Deployment status</div>
              <DeploymentSuccess />
            </div>
            <div className="reveal">
              <div className="visual-label">Merge readiness</div>
              <MergeStatus />
            </div>
          </div>
        </div>
      </section>

      {/* Deterministic Execution */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="reveal mb-6">Deterministic execution everywhere</h2>
            <p className="reveal text-[20px] text-pale-wood/70 max-w-3xl mx-auto">
              Seeded runners, environment recipes, and modality-specific artifacts ensure <span className="highlight-solid cyan text-cyan">every claim is reproducible</span> before and after a patch
            </p>
          </div>

          <div className="reveal">
            <ReleaseVisual />
          </div>
        </div>
      </section>

      {/* Evidence Standards */}
      <section className="section-padding relative overflow-hidden">
        {/* Minimal white bar */}
        <div className="absolute inset-0 pointer-events-none opacity-12">
          <motion.div
            className="absolute top-1/2 left-1/4 w-px h-64"
            style={{ background: 'linear-gradient(180deg, #f6f4f1 0%, transparent 100%)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container-max relative z-10">
          <h2 className="reveal mb-20 text-center">
            <span className="text-highlight in-view">Evidence that</span> any engineer can read
            </h2>

          <div className="max-w-5xl mx-auto space-y-6">
            {[
              {
                num: '01',
                title: 'One-page summary',
                content: 'Entry point, impact, root cause, and the exact locations touched. Clear explanation of what was found and why it matters.',
                highlight: 'tan'
              },
              {
                num: '02',
                title: 'Reproduction',
                content: 'A short, stepwise script with prerequisites and expected pre-patch behavior. Anyone can verify the vulnerability exists.',
                highlight: 'cyan'
              },
              {
                num: '03',
                title: 'Verification',
                content: 'Post-patch replay with clear pass criteria and artifacts. Proof that the fix works and the vulnerability is eliminated.',
                highlight: 'tan'
              },
              {
                num: '04',
                title: 'Change set',
                content: 'Minimal diff and targeted tests. Only the necessary changes, with tests that prove correctness.',
                highlight: 'cyan'
              },
              {
                num: '05',
                title: 'Rollback',
                content: 'Concrete plan with a single command or revert ref. One-step rollback if issues arise post-deployment.',
                highlight: 'tan'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`evidence-row ${item.highlight}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 8 }}
              >
                <div className="evidence-num">{item.num}</div>
                <div className="evidence-content-block">
                  <h4 className="evidence-heading">{item.title}</h4>
                  <p className="evidence-text">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Safety */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <h2 className="reveal mb-20 text-center">Governance and safety</h2>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Access Control',
                items: [
                  { label: 'Scoping', value: 'Repository-level' },
                  { label: 'RBAC', value: 'Granular roles' },
                  { label: 'SSO/SAML', value: 'Enterprise ready' },
                  { label: 'SCIM', value: 'Auto-provisioning' }
                ]
              },
              {
                title: 'Data Protection',
                items: [
                  { label: 'Encryption', value: 'End-to-end' },
                  { label: 'Keys', value: 'Customer-managed' },
                  { label: 'Retention', value: 'Configurable' },
                  { label: 'Audit logs', value: 'Immutable' }
                ]
              },
              {
                title: 'Policy Enforcement',
                items: [
                  { label: 'Allow/Deny lists', value: 'Customizable' },
                  { label: 'Egress rules', value: 'Network-level' },
                  { label: 'Rate limits', value: 'Adaptive' },
                  { label: 'Windows', value: 'Scheduled' }
                ]
              }
            ].map((section, i) => (
              <div key={i} className="governance-section reveal">
                <h3 className="governance-title">
                  <span className="highlight-solid-tan">{section.title}</span>
                </h3>
                <div className="governance-items">
                  {section.items.map((item, j) => (
                    <div key={j} className="governance-item">
                      <span className="item-label">{item.label}</span>
                      <span className="item-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="reveal mb-20 text-center">Core principles</h2>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { icon: '→', label: 'Core promise', text: 'Ship fixes, not alerts' },
              { icon: '◉', label: 'Design principle', text: 'Embed security where engineers already work' },
              { icon: '∞', label: 'Learning principle', text: 'Raise the baseline continuously with tenant-private reinforcement' },
              { icon: '✓', label: 'Proof principle', text: 'Deterministic evidence before and after the patch, every time' }
            ].map((item, i) => (
              <div key={i} className="reveal principle-card">
                <div className="principle-icon">{item.icon}</div>
                <div className="principle-category">{item.label}</div>
                <h3 className="principle-text">{item.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cyan text-midnight-green text-center">
        <div className="container-max">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h2 className="mb-8 text-midnight-green">Start securing your code today</h2>
            <p className="text-[24px] text-midnight-green/80 mb-12 max-w-2xl mx-auto">
              Join teams shipping secure code faster with Triage
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="mailto:srivastavan@berkeley.edu"
                className="btn btn-large bg-midnight-green text-pale-wood hover:scale-105 transition-all"
              >
                Contact Us
              </a>
              <Link 
                href="/careers"
                className="btn btn-large bg-transparent border-2 border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-pale-wood"
              >
                View Careers
              </Link>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-bg-tertiary border-t border-border">
        <div className="container-max">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <Image
                src="/triage.png"
                alt="Triage"
                width={100}
                height={28}
                className="h-7 w-auto mb-6"
                style={{ height: '28px', width: 'auto' }}
              />
              <p className="text-pale-wood/60 mb-8 max-w-sm">
                AI-powered security that embeds into your development workflow.
              </p>
            </div>
            
            {[
              { title: 'PRODUCT', links: [{ label: 'Features', href: '/#features' }, { label: 'Platform', href: '/' }] },
              { title: 'COMPANY', links: [{ label: 'Careers', href: '/careers' }, { label: 'Team', href: '/team' }, { label: 'Contact', href: 'mailto:srivastavan@berkeley.edu' }] },
              { title: 'RESOURCES', links: [{ label: 'Documentation', href: '#' }, { label: 'Security', href: '#' }] }
            ].map((section, i) => (
              <div key={i}>
                <h5 className="text-pale-wood mb-6 text-[14px] font-mono">{section.title}</h5>
                <div className="space-y-3">
                  {section.links.map((link, j) => (
                    <a key={j} href={link.href} className="block text-[15px] text-pale-wood/60 hover:text-pale-wood transition-colors">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border pt-8">
            <div className="text-[14px] text-pale-wood/40 text-center">
              © 2025 Triage. Embedded security, for everyone.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
