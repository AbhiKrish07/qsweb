import re
import os
import json
from bs4 import BeautifulSoup

def build_product_studio():
    # Read base Bitwip structure
    with open('bitwip-site-main/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    # Remove obsolete menu and old header
    old_menu = soup.find('div', id='menu')
    if old_menu:
        old_menu.decompose()
    old_nav = soup.find('header', class_='nav')
    if old_nav:
        old_nav.decompose()

    # 1. HERO SECTION (#hh)
    hh = soup.find('section', id='hh')
    if hh:
        t = hh.find('h1', class_='hh__titre')
        if t:
            t.clear()
            sr = soup.new_tag('span', **{'class': 'sr-only'})
            sr.string = 'Quiet Studio | Design & Product Software Studio'
            t.append(sr)

            lead = soup.new_tag('span', **{'class': 'mj__lead', 'aria-hidden': 'true'})
            lead.string = 'DESIGN & PRODUCT SOFTWARE STUDIO'
            t.append(lead)

            # Line 1: "Ideas into"
            l1_html = '''<span class="mj__l1" aria-hidden="true">
              <span class="mj__m">
                <span class="mj__c" style="--r:0">I</span>
                <span class="mj__c" style="--r:1">d</span>
                <span class="mj__c" style="--r:2">e</span>
                <span class="mj__c" style="--r:3">a</span>
                <span class="mj__c" style="--r:4">s</span>
              </span>
              <span class="mj__trou"></span>
              <span class="mj__m">
                <span class="mj__c" style="--r:5">i</span>
                <span class="mj__c" style="--r:6">n</span>
                <span class="mj__c" style="--r:7">t</span>
                <span class="mj__c" style="--r:8">o</span>
              </span>
            </span>'''
            t.append(BeautifulSoup(l1_html, 'html.parser'))

            # Line 2: "intelligent products."
            l2_html = '''<span class="mj__l2" aria-hidden="true">
              <span class="mj__m">
                <span class="mj__c" style="--r:9">i</span>
                <span class="mj__c" style="--r:10">n</span>
                <span class="mj__c" style="--r:11">t</span>
                <span class="mj__c" style="--r:12">e</span>
                <span class="mj__c" style="--r:13">l</span>
                <span class="mj__c" style="--r:14">l</span>
                <span class="mj__c" style="--r:15">i</span>
                <span class="mj__c" style="--r:16">g</span>
                <span class="mj__c" style="--r:17">e</span>
                <span class="mj__c" style="--r:18">n</span>
                <span class="mj__c" style="--r:19">t</span>
              </span>
              <span class="mj__trou"></span>
              <span class="mj__m">
                <span class="mj__c" style="--r:20">p</span>
                <span class="mj__c" style="--r:21">r</span>
                <span class="mj__c" style="--r:22">o</span>
                <span class="mj__c" style="--r:23">d</span>
                <span class="mj__c" style="--r:24">u</span>
                <span class="mj__c" style="--r:25">c</span>
                <span class="mj__c" style="--r:26">t</span>
                <span class="mj__c" style="--r:27">s</span>
                <span class="mj__c" style="--r:28">.</span>
              </span>
              <span class="etoile mj__etoile"></span>
            </span>'''
            t.append(BeautifulSoup(l2_html, 'html.parser'))

        for ghost in hh.find_all('div', class_=['mj__fantome', 'mj__copie']):
            glead = ghost.find('div', class_='mj__lead')
            if glead: glead.string = 'DESIGN & PRODUCT SOFTWARE STUDIO'
            gl1 = ghost.find('div', class_='mj__l1')
            if gl1:
                gl1.clear()
                gl1.append(BeautifulSoup('''<span class="mj__m"><span class="mj__c" style="--r:0">I</span><span class="mj__c" style="--r:1">d</span><span class="mj__c" style="--r:2">e</span><span class="mj__c" style="--r:3">a</span><span class="mj__c" style="--r:4">s</span></span> <span class="mj__trou"></span> <span class="mj__m"><span class="mj__c" style="--r:5">i</span><span class="mj__c" style="--r:6">n</span><span class="mj__c" style="--r:7">t</span><span class="mj__c" style="--r:8">o</span></span>''', 'html.parser'))
            gl2 = ghost.find('div', class_='mj__l2')
            if gl2:
                gl2.clear()
                gl2.append(BeautifulSoup('''<span class="mj__m"><span class="mj__c" style="--r:9">i</span><span class="mj__c" style="--r:10">n</span><span class="mj__c" style="--r:11">t</span><span class="mj__c" style="--r:12">e</span><span class="mj__c" style="--r:13">l</span><span class="mj__c" style="--r:14">l</span><span class="mj__c" style="--r:15">i</span><span class="mj__c" style="--r:16">g</span><span class="mj__c" style="--r:17">e</span><span class="mj__c" style="--r:18">n</span><span class="mj__c" style="--r:19">t</span></span> <span class="mj__trou"></span> <span class="mj__m"><span class="mj__c" style="--r:20">p</span><span class="mj__c" style="--r:21">r</span><span class="mj__c" style="--r:22">o</span><span class="mj__c" style="--r:23">d</span><span class="mj__c" style="--r:24">u</span><span class="mj__c" style="--r:25">c</span><span class="mj__c" style="--r:26">t</span><span class="mj__c" style="--r:27">s</span><span class="mj__c" style="--r:28">.</span></span><span class="etoile mj__etoile"></span>''', 'html.parser'))

        vid = hh.find('video')
        if vid:
            vid['poster'] = '/assets/quiet/hero-holum.jpg'
            vid['aria-label'] = 'Quiet Studio showreel: turning ideas into intelligent digital products'

        clocks = hh.find('div', class_='clocks')
        if clocks:
            clocks['aria-label'] = 'Global Engineering & Design Time Zones'
            clocks.clear()
            clocks_html = '''
            <a class="clock" href="#method"><span class="clock__city">San Francisco</span><span class="clock__time c-time" data-tz="America/Los_Angeles">--:--</span><span class="sr-only">, San Francisco Time</span></a>
            <a class="clock" href="#method"><span class="clock__city">New York</span><span class="clock__time c-time" data-tz="America/New_York">--:--</span><span class="sr-only">, New York Time</span></a>
            <a class="clock" href="#method"><span class="clock__city">London</span><span class="clock__time c-time" data-tz="Europe/London">--:--</span><span class="sr-only">, London Time</span></a>
            <a class="clock" href="#method"><span class="clock__city">Tokyo</span><span class="clock__time c-time" data-tz="Asia/Tokyo">--:--</span><span class="sr-only">, Tokyo Time</span></a>
            <a class="clock" href="#method"><span class="clock__city">Bengaluru</span><span class="clock__time c-time" data-tz="Asia/Kolkata">--:--</span><span class="sr-only">, Bengaluru Time</span></a>
            '''
            clocks.append(BeautifulSoup(clocks_html, 'html.parser'))

        # Manifest paragraph with word tokens (.hh__w) for dynamic p-hero-accueil kinetic animation
        manif = hh.find('p', class_='hh__manif')
        if manif:
            manif.clear()
            manif_html = '''<span class="hh__phr" data-mots="">
              <span class="hh__w">We</span>
              <span class="hh__w">design,</span>
              <span class="hh__w">build</span>
              <span class="hh__w">and</span>
              <span class="hh__w"><span class="baila">evolve digital products</span>,</span>
              <span class="hh__w">software</span>
              <span class="hh__w">and</span>
              <span class="hh__w"><span class="baila">intelligent AI systems</span></span>
              <span class="hh__w">that</span>
              <span class="hh__w">turn</span>
              <span class="hh__w">complex</span>
              <span class="hh__w">ideas</span>
              <span class="hh__w">into</span>
              <span class="hh__w"><span class="baila">working reality</span>.</span>
            </span>'''
            manif.append(BeautifulSoup(manif_html, 'html.parser'))

    # 2. INJECT PRODUCT SQUAD / AUTONOMOUS SPRINT CARDS (From Screenshot 1)
    squad_section_html = '''
    <section class="sec sec--squad" id="squad" style="background:#0d0d0c;padding:64px 0 80px;border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);overflow:hidden;">
      <div class="wrap">
        <header class="head" style="margin-bottom:36px;">
          <p class="head__k label" style="color:var(--papaye);"><span class="head__n" style="border-color:var(--papaye);color:var(--papaye);">01</span>AUTONOMOUS PRODUCT SQUAD</p>
          <h2 class="head__t" style="color:#ffffff;font-size:clamp(1.8rem,3.2vw,2.8rem);font-weight:700;">
            Running product sprints is a <span class="baila">full-time job</span>.
          </h2>
          <div class="head__side" style="--d:.1s">
            <p class="head__i" style="color:rgba(255,255,255,0.85);font-size:1.15rem;line-height:1.55;">
              So we built an autonomous studio squad combining senior product design, Claude 3.7 reasoning, and token-driven engineering to ship it for you.
            </p>
          </div>
        </header>

        <!-- The 5 Cards from Screenshot 1 -->
        <div class="squad-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:20px;align-items:stretch;">
          
          <!-- Card 1: Sprints & Full-time Job -->
          <div style="background:#141413;border:1px solid rgba(255,90,31,0.3);border-radius:24px;padding:28px 24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 36px rgba(0,0,0,0.4);">
            <div>
              <span style="display:inline-block;padding:4px 10px;border-radius:9999px;background:rgba(255,90,31,0.15);color:#ff5a1f;font:700 11px/1 monospace;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:18px;">QUIET STUDIO</span>
              <h3 style="color:#ffffff;font-size:1.35rem;font-weight:700;line-height:1.3;margin-bottom:12px;">Running product sprints is a full-time job.</h3>
              <p style="color:rgba(255,255,255,0.7);font-size:0.92rem;line-height:1.55;margin-bottom:20px;">So we built an autonomous studio squad to ship it for you.</p>
            </div>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;font-size:0.88rem;color:rgba(255,255,255,0.88);">
              <li style="display:flex;align-items:center;gap:8px;"><span style="color:#ff5a1f;font-weight:900;">✓</span> Check UX Retention &amp; CAC</li>
              <li style="display:flex;align-items:center;gap:8px;"><span style="color:#ff5a1f;font-weight:900;">✓</span> Resize Responsive Layouts</li>
              <li style="display:flex;align-items:center;gap:8px;"><span style="color:#ff5a1f;font-weight:900;">✓</span> Next.js 15 App Router</li>
              <li style="display:flex;align-items:center;gap:8px;"><span style="color:#ff5a1f;font-weight:900;">✓</span> 100% Lighthouse Performance</li>
            </ul>
          </div>

          <!-- Card 2: Claude 3.7 Reasoning -->
          <div style="background:#f4f3ee;border:1px solid rgba(0,0,0,0.08);border-radius:24px;padding:28px 24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 36px rgba(0,0,0,0.25);">
            <div>
              <span style="display:inline-flex;align-items:center;gap:6px;color:#10b981;font:700 11px/1 monospace;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:16px;">
                <span style="width:7px;height:7px;border-radius:50%;background:#10b981;display:inline-block;"></span> CLAUDE 3.7 REASONING
              </span>
              <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.06);border-radius:16px;padding:16px;margin-bottom:16px;">
                <p style="color:#111111;font-size:0.95rem;line-height:1.5;font-weight:500;margin:0;">
                  "Make this checkout conversion 40% higher with zero friction &amp; tactile clicks."
                </p>
              </div>
              <div style="height:90px;border-radius:14px;background:linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #ff5a1f 100%);margin-bottom:16px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);"></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid rgba(0,0,0,0.08);">
              <span style="font-size:0.85rem;color:#52525b;font-weight:600;">Refreshed Checkout Flow</span>
              <span style="font:700 0.95rem/1 monospace;color:#10b981;">+$1,234 / day</span>
            </div>
          </div>

          <!-- Card 3: Principal Partner Abhinav Live Sprint -->
          <div style="background:#0a0a09;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;box-shadow:0 12px 36px rgba(0,0,0,0.5);">
            <div style="position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;font:700 10.5px/1 monospace;color:rgba(255,255,255,0.85);letter-spacing:0.04em;">
              <span style="display:flex;align-items:center;gap:6px;"><span style="color:#ef4444;">🔴</span> REC 4K</span>
              <span>00:14:32:08</span>
            </div>
            <div style="position:relative;z-index:2;margin:28px 0;text-align:center;">
              <div style="width:96px;height:96px;border-radius:50%;margin:0 auto 14px;overflow:hidden;border:2px solid #ff5a1f;box-shadow:0 0 20px rgba(255,90,31,0.35);">
                <img src="/assets/abhinav.png" alt="Principal Partner Abhinav" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='/assets/quiet/hero-holum.jpg';">
              </div>
              <h4 style="color:#ffffff;font-size:1.05rem;font-weight:700;margin:0 0 4px;">Principal Partner Abhinav</h4>
              <p style="color:rgba(255,255,255,0.6);font-size:0.82rem;margin:0;">Architecture &amp; Applied AI Lead</p>
            </div>
            <div style="position:relative;z-index:2;background:rgba(255,90,31,0.18);border:1px solid rgba(255,90,31,0.4);border-radius:9999px;padding:8px 14px;text-align:center;">
              <span style="color:#ff5a1f;font:700 11px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;">PRINCIPAL PARTNER · LIVE SPRINT</span>
            </div>
          </div>

          <!-- Card 4: 3D Token System -->
          <div style="background:#feece5;border:1px solid rgba(255,90,31,0.2);border-radius:24px;padding:28px 24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 36px rgba(0,0,0,0.2);">
            <div>
              <h3 style="color:#111111;font-size:1.25rem;font-weight:700;line-height:1.3;margin-bottom:18px;">Is your design system letting you down?</h3>
              <div style="background:#141413;border-radius:18px;padding:24px 18px;text-align:center;margin-bottom:18px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">
                <span style="display:block;color:rgba(255,255,255,0.6);font:600 10px/1 monospace;letter-spacing:0.08em;margin-bottom:6px;">QUIET STUDIO</span>
                <span style="display:block;color:#ffffff;font-size:1.15rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px;">3D TOKEN SYSTEM</span>
                <span style="display:inline-block;padding:4px 10px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:700 10.5px/1 monospace;">Sub-50ms</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid rgba(0,0,0,0.08);">
              <span style="font-size:0.85rem;color:#71717a;font-weight:600;">Bulk Shipped 50+ Components</span>
              <span style="font:700 0.95rem/1 monospace;color:#ff5a1f;">+$4,120</span>
            </div>
          </div>

          <!-- Card 5: Meet Your Squad CTA -->
          <div style="background:#18181b;border:1px solid rgba(255,255,255,0.15);border-radius:24px;padding:28px 24px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 36px rgba(0,0,0,0.4);">
            <div>
              <span style="display:inline-block;color:#ff5a1f;font-size:1.1rem;margin-bottom:12px;">✦</span>
              <h3 style="color:#ffffff;font-size:1.4rem;font-weight:700;line-height:1.25;margin-bottom:12px;">Meet your dedicated studio squad.</h3>
              <p style="color:rgba(255,255,255,0.7);font-size:0.92rem;line-height:1.55;">
                Senior product designers, full-stack engineers, and AI architects operating with extreme craft, zero bloat, and fast sprint velocity.
              </p>
            </div>
            <div style="margin-top:24px;">
              <a href="#contact" class="cmd" style="width:100%;justify-content:center;background:#ff5a1f;color:#ffffff;font-weight:700;border:none;border-radius:9999px;padding:12px 20px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
                <span>Start a project</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
    '''

    # Insert squad section right after the hero
    if hh:
        hh.insert_after(BeautifulSoup(squad_section_html, 'html.parser'))

    # 3. QUIET STUDIO IN-HOUSE SOFTWARE SUITE (Highlighting the real software products!)
    software_suite_html = '''
    <section class="sec sec--software" id="software" style="background:#141413;padding:72px 0 84px;border-bottom:1px solid rgba(255,255,255,0.08);">
      <div class="wrap">
        <header class="head" style="margin-bottom:44px;">
          <p class="head__k label" style="color:var(--papaye);"><span class="head__n" style="border-color:var(--papaye);color:var(--papaye);">02</span>IN-HOUSE SOFTWARE &amp; OPEN CORE</p>
          <h2 class="head__t" style="color:#ffffff;font-size:clamp(1.8rem,3.2vw,2.8rem);font-weight:700;">
            Software we conceived, <span class="baila">engineered and shipped</span>.<span aria-hidden="true" class="etoile"></span>
          </h2>
          <div class="head__side" style="--d:.1s">
            <p class="head__i" style="color:rgba(255,255,255,0.85);font-size:1.15rem;line-height:1.55;">
              We don't just advise or design mocks—we build and release real working software, local AI engines, and desktop systems.
            </p>
          </div>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:24px;">
          
          <!-- Zen AI -->
          <div style="background:#1a1918;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.2s ease;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font:800 13px/1 monospace;color:#ff5a1f;text-transform:uppercase;letter-spacing:0.06em;">01 / CORE RUNTIME</span>
                <span style="background:rgba(255,90,31,0.15);color:#ff5a1f;padding:4px 10px;border-radius:9999px;font:700 10.5px/1 monospace;">OPEN SOURCE</span>
              </div>
              <h3 style="color:#ffffff;font-size:1.6rem;font-weight:800;margin:0 0 10px;">Zen AI Engine</h3>
              <p style="color:rgba(255,255,255,0.78);font-size:0.95rem;line-height:1.6;margin-bottom:20px;">
                Serene, local-first on-device AI runtime built in Rust and C++. Executes quantized multimodal neural models directly on Apple Silicon and WebGPU with sub-0.2ms latency and zero cloud telemetry.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Rust / C++</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">WebGPU</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Sub-0.2ms Latency</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
              <span style="font:700 11px/1 monospace;color:rgba(255,255,255,0.5);">STATUS: ACTIVE V1.0</span>
              <a href="/models" style="color:#ff5a1f;font:700 12.5px/1 monospace;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                Inspect Model ↗
              </a>
            </div>
          </div>

          <!-- LearnLoop -->
          <div style="background:#1a1918;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font:800 13px/1 monospace;color:#38bdf8;text-transform:uppercase;letter-spacing:0.06em;">02 / ADAPTIVE LEARNING</span>
                <span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:4px 10px;border-radius:9999px;font:700 10.5px/1 monospace;">FLAGSHIP WEB APP</span>
              </div>
              <h3 style="color:#ffffff;font-size:1.6rem;font-weight:800;margin:0 0 10px;">LearnLoop</h3>
              <p style="color:rgba(255,255,255,0.78);font-size:0.95rem;line-height:1.6;margin-bottom:20px;">
                A frictionless loop for turning curiosity into durable understanding. Uses spaced active-recall graphs and concept maps to compress learning curves without productivity theatre.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Next.js 15</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">TypeScript</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Recall Graphs</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
              <span style="font:700 11px/1 monospace;color:rgba(255,255,255,0.5);">STATUS: IN THE LAB</span>
              <a href="/products/learnloop" style="color:#38bdf8;font:700 12.5px/1 monospace;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                Launch Product ↗
              </a>
            </div>
          </div>

          <!-- Capture Desktop -->
          <div style="background:#1a1918;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font:800 13px/1 monospace;color:#a855f7;text-transform:uppercase;letter-spacing:0.06em;">03 / DESKTOP OS</span>
                <span style="background:rgba(168,85,247,0.15);color:#a855f7;padding:4px 10px;border-radius:9999px;font:700 10.5px/1 monospace;">LOCAL OS APP</span>
              </div>
              <h3 style="color:#ffffff;font-size:1.6rem;font-weight:800;margin:0 0 10px;">Capture Desktop</h3>
              <p style="color:rgba(255,255,255,0.78);font-size:0.95rem;line-height:1.6;margin-bottom:20px;">
                Local-first cognitive workspace and context recorder. Seamlessly captures screen, audio, and code snippets into an offline searchable vector database with sub-50ms instant recall.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Tauri / Rust</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Vector SQLite</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Offline Only</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
              <span style="font:700 11px/1 monospace;color:rgba(255,255,255,0.5);">STATUS: PRIVATE ALPHA</span>
              <a href="/products/capture" style="color:#a855f7;font:700 12.5px/1 monospace;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                View Specs ↗
              </a>
            </div>
          </div>

          <!-- Aethel Runtime -->
          <div style="background:#1a1918;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font:800 13px/1 monospace;color:#22c55e;text-transform:uppercase;letter-spacing:0.06em;">04 / AGENTIC OS</span>
                <span style="background:rgba(34,197,94,0.15);color:#22c55e;padding:4px 10px;border-radius:9999px;font:700 10.5px/1 monospace;">RESEARCH</span>
              </div>
              <h3 style="color:#ffffff;font-size:1.6rem;font-weight:800;margin:0 0 10px;">Aethel Runtime</h3>
              <p style="color:rgba(255,255,255,0.78);font-size:0.95rem;line-height:1.6;margin-bottom:20px;">
                Context-aware ambient multi-agent runtime. Explores discrete authority gating, cryptographic intent verification, and autonomous agent coordination without user friction.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Multi-Agent</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Authority Gating</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Crypto Audit</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
              <span style="font:700 11px/1 monospace;color:rgba(255,255,255,0.5);">STATUS: ACTIVE RESEARCH</span>
              <a href="/products/aethel" style="color:#22c55e;font:700 12.5px/1 monospace;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                Read Thesis ↗
              </a>
            </div>
          </div>

          <!-- Titan Analytics -->
          <div style="background:#1a1918;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font:800 13px/1 monospace;color:#eab308;text-transform:uppercase;letter-spacing:0.06em;">05 / FINTECH DASHBOARD</span>
                <span style="background:rgba(234,179,8,0.15);color:#eab308;padding:4px 10px;border-radius:9999px;font:700 10.5px/1 monospace;">ENTERPRISE</span>
              </div>
              <h3 style="color:#ffffff;font-size:1.6rem;font-weight:800;margin:0 0 10px;">Titan Analytics</h3>
              <p style="color:rgba(255,255,255,0.78);font-size:0.95rem;line-height:1.6;margin-bottom:20px;">
                Streaming financial intelligence and portfolio anomaly detection engine. Provides sub-second predictive risk scoring, real-time telemetry, and automated transaction clustering.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Next.js 15</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">PostgreSQL</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Realtime Sockets</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
              <span style="font:700 11px/1 monospace;color:rgba(255,255,255,0.5);">STATUS: PRODUCTION</span>
              <a href="#contact" style="color:#eab308;font:700 12.5px/1 monospace;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                Live Demo ↗
              </a>
            </div>
          </div>

          <!-- Whitespace / Driftboard -->
          <div style="background:#1a1918;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:32px 28px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <span style="font:800 13px/1 monospace;color:#f97316;text-transform:uppercase;letter-spacing:0.06em;">06 / SPATIAL CANVAS</span>
                <span style="background:rgba(249,115,22,0.15);color:#f97316;padding:4px 10px;border-radius:9999px;font:700 10.5px/1 monospace;">WORKBENCH</span>
              </div>
              <h3 style="color:#ffffff;font-size:1.6rem;font-weight:800;margin:0 0 10px;">Whitespace</h3>
              <p style="color:rgba(255,255,255,0.78);font-size:0.95rem;line-height:1.6;margin-bottom:20px;">
                A calm, spatial canvas where notes, research snippets, and code blocks cluster naturally into themes over time with ⌘K instant neural recall.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Spatial Canvas</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Local IndexedDB</span>
                <span style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:4px 10px;border-radius:6px;font:600 11px/1 monospace;">Zero Bloat</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);">
              <span style="font:700 11px/1 monospace;color:rgba(255,255,255,0.5);">STATUS: IN THE LAB</span>
              <a href="/products/whitespace" style="color:#f97316;font:700 12.5px/1 monospace;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                Open Canvas ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
    '''

    # Insert software suite right after squad section
    squad_el = soup.find('section', id='squad')
    if squad_el:
        squad_el.insert_after(BeautifulSoup(software_suite_html, 'html.parser'))

    # 4. STUDIO PHILOSOPHY (#agence) — PURGE ALL BITWIP / CAYENNE / BEACH PHOTOS & MANIFESTO
    ag = soup.find('section', id='agence')
    if ag:
        # Title
        t = ag.find('h2', id='t-agence')
        if t:
            t.clear()
            t.append(BeautifulSoup('Good products begin with <span class="baila">good questions</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = ag.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">03</span>Philosophy', 'html.parser'))

        # Replace entire sensee container with Quiet Studio's actual design & software manifesto
        sensee = ag.find('div', class_='sensee')
        if sensee:
            sensee.clear()
            sensee_html = '''
            <p class="sensee__lead" style="color:#111111;font-size:clamp(1.25rem,2.2vw,1.75rem);font-weight:600;line-height:1.55;max-width:860px;margin-bottom:28px;">
              Quiet Studio is an independent design and software product studio. We conceive, design and engineer digital products, open-core software, and applied AI systems with obsessive craft and zero ceremony.
            </p>
            <div class="sensee__p" style="color:#27272a;font-size:1.05rem;line-height:1.7;max-width:800px;margin-bottom:36px;">
              <p>We believe the best digital products happen when product thinking, high-craft interface design, and deep software engineering happen together under one roof. No handoff walls, no bloated agency meetings—just senior builders shipping working software.</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;width:100%;">
              <div style="padding:28px 24px;background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.08);border-radius:20px;box-shadow:0 4px 18px rgba(0,0,0,0.03);">
                <span class="label" style="color:var(--papaye);font-size:11px;letter-spacing:0.08em;font-weight:700;">01 — PRODUCT THINKING</span>
                <h4 style="margin:12px 0 6px;font-size:1.25rem;font-weight:700;color:#111111;">What &amp; Why</h4>
                <p style="font-size:0.92rem;line-height:1.55;color:#27272a;margin:0;">Deconstruct the actual user friction, core loop, and architectural requirements before writing a line of code or pushing a pixel.</p>
              </div>
              <div style="padding:28px 24px;background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.08);border-radius:20px;box-shadow:0 4px 18px rgba(0,0,0,0.03);">
                <span class="label" style="color:var(--papaye);font-size:11px;letter-spacing:0.08em;font-weight:700;">02 — ZERO HANDOFF WALLS</span>
                <h4 style="margin:12px 0 6px;font-size:1.25rem;font-weight:700;color:#111111;">Designers Who Code</h4>
                <p style="font-size:0.92rem;line-height:1.55;color:#27272a;margin:0;">No static mockups thrown over a fence. Our designers build live React components with tactile clicks, physics-driven easing, and tokenized consistency.</p>
              </div>
              <div style="padding:28px 24px;background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.08);border-radius:20px;box-shadow:0 4px 18px rgba(0,0,0,0.03);">
                <span class="label" style="color:var(--papaye);font-size:11px;letter-spacing:0.08em;font-weight:700;">03 — APPLIED AI UTILITY</span>
                <h4 style="margin:12px 0 6px;font-size:1.25rem;font-weight:700;color:#111111;">On-Device &amp; Private</h4>
                <p style="font-size:0.92rem;line-height:1.55;color:#27272a;margin:0;">We deploy intelligence directly into the user experience: quantized local runtimes, semantic search, and autonomous workflows that genuinely reduce toil.</p>
              </div>
              <div style="padding:28px 24px;background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.08);border-radius:20px;box-shadow:0 4px 18px rgba(0,0,0,0.03);">
                <span class="label" style="color:var(--papaye);font-size:11px;letter-spacing:0.08em;font-weight:700;">04 — SPRINT SPEED</span>
                <h4 style="margin:12px 0 6px;font-size:1.25rem;font-weight:700;color:#111111;">Working Software</h4>
                <p style="font-size:0.92rem;line-height:1.55;color:#27272a;margin:0;">Structured weekly sprints with live preview URLs and production git commits. We measure success by deployed software, not endless meetings.</p>
              </div>
            </div>
            '''
            sensee.append(BeautifulSoup(sensee_html, 'html.parser'))

        # Replace old employee photo carousel (.ag-vie) with Quiet Studio Product & Architecture Gallery
        ag_vie = ag.find('div', class_='ag-vie')
        if ag_vie:
            ag_vie.clear()
            gallery_html = '''
            <div class="ag-vie__bande" role="group" style="padding:40px 0 20px;">
              <ul class="ag-vie__piste" style="display:flex;gap:20px;list-style:none;padding:0;margin:0;overflow-x:auto;">
                <li style="flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/hero-studio-craft.jpg" alt="Design System &amp; Component Library" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li style="flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/fintech-identity.jpg" alt="Zen AI Local Engine Architecture" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li style="flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/project-atlas.jpg" alt="Capture Desktop Local Cognitive OS" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li style="flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/product-brand.jpg" alt="Resonance OS Adaptive Learning System" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li style="flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/digital-editorial.jpg" alt="Aethel Multi-Agent Orchestration Engine" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
              </ul>
            </div>
            '''
            ag_vie.append(BeautifulSoup(gallery_html, 'html.parser'))

    # 5. PRACTICES / SERVICES (#expertises) — REWRITE ALL 4 DETAILS TO PRODUCT DESIGN & SOFTWARE
    exp = soup.find('section', id='expertises')
    if exp:
        t = exp.find('h2', id='t-expertises')
        if t:
            t.clear()
            t.append(BeautifulSoup('Four disciplines, one <span class="baila">unified studio</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = exp.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">04</span>Practices', 'html.parser'))

        side = exp.find('div', class_='head__side')
        if side:
            p = side.find('p', class_='head__i')
            if p:
                p.clear()
                p.append(BeautifulSoup('From first product PRD to deployed software: interface design, software engineering, applied AI, and brand systems.', 'html.parser'))

        # Decompose old Bitwip client case study drawers (.xvit)
        for vit in exp.find_all('div', class_='xvit'):
            vit.decompose()

        # Update each details.xep__item accordion with Quiet Studio Design & Software Practices!
        details_items = exp.find_all('details', class_='xep__item')
        practices_data = [
            {
                'num': '01',
                'title': 'Product Design & Systems',
                'desc': 'We design thoughtful, high-craft digital interfaces, frictionless user flows, and tokenized design systems that scale effortlessly from mobile to 4K displays.',
                'deliverables': ['UX/UI & Interface Architecture', 'Design Systems & Token Libraries', 'Interaction Physics & Micro-interactions', 'Tactile Click & Audio Feedback', 'Interactive Figma & React Prototypes']
            },
            {
                'num': '02',
                'title': 'Full-Stack Software Engineering',
                'desc': 'Production-grade web apps, local-first architectures, low-latency APIs, and modular frontends built with Next.js 15, TypeScript, WebGPU, and PostgreSQL.',
                'deliverables': ['Next.js 15 App Router & React 19', 'TypeScript & High-Throughput APIs', 'Database Architecture & PostgreSQL', 'WebGPU & Client Canvas Acceleration', 'CI/CD & Sub-50ms Edge Deployment']
            },
            {
                'num': '03',
                'title': 'Applied AI & Intelligent Systems',
                'desc': 'We build intelligent software with genuine utility: local on-device inference, semantic vector retrieval (RAG), autonomous multi-agent pipelines, and context threading.',
                'deliverables': ['Local-First On-Device AI Runtimes', 'RAG & High-Accuracy Vector Search', 'Autonomous Multi-Agent Orchestration', 'Model Fine-Tuning & Quantization', 'Document Intelligence & Synthetic Workflows']
            },
            {
                'num': '04',
                'title': 'Brand Identity & Product Narrative',
                'desc': 'A great product deserves an iconic visual identity and compelling story. We craft distinctive wordmarks, typography systems, launch narrative, and conversion-engineered landing pages.',
                'deliverables': ['Brand Strategy & Positioning', 'Typography & Visual Identity Systems', 'High-Converting Product Pages', 'Product Narrative & Micro-copy', 'Launch Kits & Pitch Decks']
            }
        ]

        for i, d in enumerate(details_items[:4]):
            data = practices_data[i]
            # Summary title
            summary = d.find('summary')
            if summary:
                t_el = summary.find('h3', class_='xep__t')
                if t_el:
                    t_el.string = data['title']
                else:
                    h = soup.new_tag('h3', **{'class': 'xep__t'})
                    h.string = data['title']
                    summary.append(h)

            # Description paragraph
            d_el = d.find('p', class_='xep__d')
            if d_el:
                d_el.string = data['desc']

            # Deliverables bullet list
            ul = d.find('ul', class_='xep__p')
            if ul:
                ul.clear()
                for item in data['deliverables']:
                    li = soup.new_tag('li')
                    li.string = item
                    ul.append(li)

    # 6. PORTFOLIO / SELECTED WORK (#realisations)
    real = soup.find('section', id='realisations')
    if real:
        t = real.find('h2', id='t-realisations')
        if t:
            t.clear()
            t.append(BeautifulSoup('Software and intelligent systems <span class="baila">built to work</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = real.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">05</span>Selected Work', 'html.parser'))

        side = real.find('div', class_='head__side')
        if side:
            p = side.find('p', class_='head__i')
            if p:
                p.clear()
                p.append(BeautifulSoup('A selection of software platforms, AI systems, and digital products conceived, designed and engineered by Quiet Studio.', 'html.parser'))

        cartes = real.find('div', class_='piste__cartes') or real.find('div', class_='qr-grille')
        if cartes:
            # 5 Real Studio Products & Systems
            products_work = [
                {
                    'title': 'Zen AI Engine',
                    'tag': 'Core Runtime',
                    'cat': 'Quantized Inference',
                    'desc': 'High-throughput quantized edge inference engine running large multimodal models directly on Apple Silicon and browser WebGPU with sub-0.2ms latency and zero cloud telemetry.',
                    'img': '/assets/quiet/fintech-identity.jpg'
                },
                {
                    'title': 'Capture Desktop',
                    'tag': 'In-House Product',
                    'cat': 'Cognitive Workspace',
                    'desc': 'A local-first desktop OS and cognitive workspace designed for deep work. Features offline-first vector storage, sub-50ms fuzzy recall, and semantic context threading.',
                    'img': '/assets/quiet/hero-studio-craft.jpg'
                },
                {
                    'title': 'LearnLoop',
                    'tag': 'Flagship Web App',
                    'cat': 'Adaptive Learning',
                    'desc': 'An adaptive spaced-repetition and concept-mapping engine that turns curiosity into durable understanding through active-recall feedback loops.',
                    'img': '/assets/quiet/product-brand.jpg'
                },
                {
                    'title': 'Aethel Runtime',
                    'tag': 'AI System',
                    'cat': 'Autonomous Agents',
                    'desc': 'A context-aware multi-agent orchestration runtime with discrete authority gating, cryptographic audit logs, and deterministic verification protocols.',
                    'img': '/assets/quiet/startup-presentation.jpg'
                },
                {
                    'title': 'Titan Analytics',
                    'tag': 'Product Build',
                    'cat': 'Financial Intelligence',
                    'desc': 'Real-time financial intelligence dashboard providing streaming anomaly detection, portfolio telemetry, and institutional-grade predictive risk models.',
                    'img': '/assets/quiet/hero-typography.jpg'
                }
            ]

            cartes.clear()
            for p in products_work:
                card_html = f'''
                <article class="qr" data-metier="studio-product">
                  <p class="qr__client">
                    <span class="label" style="color:var(--papaye);font-weight:700;">{p['tag']}</span>
                    <span class="tag">{p['cat']}</span>
                    <span class="tag tag--metier"><span aria-hidden="true" class="forme forme--sceau forme--lavande"></span>Product</span>
                  </p>
                  <div class="qr__media">
                    <img alt="{p['title']}" src="{p['img']}" decoding="async" height="1280" loading="lazy" width="1440" style="object-fit:cover;width:100%;height:100%;border-radius:18px;"/>
                  </div>
                  <div class="qr__corps">
                    <h3 class="qr__q"><a class="qr__lien" data-verbe="Inspect system" href="#contact">{p['title']}</a></h3>
                    <p class="qr__a" style="color:rgba(255,255,255,0.88);line-height:1.55;font-size:0.95rem;">{p['desc']}</p>
                  </div>
                </article>
                '''
                cartes.append(BeautifulSoup(card_html, 'html.parser'))

    # 7. HOW WE WORK / THE METHOD (Replacing #territoires / French locations)
    terr = soup.find('section', id='territoires')
    if terr:
        terr['id'] = 'method'
        wrap = terr.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            method_html = '''
            <header class="head head--seul">
              <p class="head__k label"><span class="head__n">06</span>The Method</p>
              <h2 class="head__t" data-reveal="" id="t-terr">From first sprint to <span class="baila">production release</span>.<span aria-hidden="true" class="etoile"></span></h2>
              <p class="head__i head__perimetre" data-reveal="" style="--d:.05s;max-width:760px;font-size:1.15rem;line-height:1.6;color:rgba(255,255,255,0.85);margin-top:16px;">
                We follow a rigorous, 6-stage engineering and design lifecycle. Clear milestones, continuous integration, and rapid sprint velocity ensure ambitious software ships on time.
              </p>
            </header>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;margin-top:48px;">
              <article style="padding:32px 28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 01</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Discover</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Deconstruct the core problem, interview stakeholders, analyze competitive workflows, and evaluate architectural feasibility before design begins.</p>
              </article>
              <article style="padding:32px 28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 02</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Define</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Author unambiguous PRDs, map user journeys, define data contracts and database schemas, and lock in the modern technology stack.</p>
              </article>
              <article style="padding:32px 28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 03</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Design</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Craft complete design systems, high-density token architectures, responsive layouts, and interactive micro-prototypes with tactile feedback.</p>
              </article>
              <article style="padding:32px 28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 04</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Engineer</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Implement full-stack Next.js 15 App Router applications, low-latency TypeScript APIs, PostgreSQL models, and native AI integrations.</p>
              </article>
              <article style="padding:32px 28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 05</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Validate</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Rigorous end-to-end testing, sub-50ms latency benchmarking, 100% Lighthouse audit compliance, and multi-device usability verification.</p>
              </article>
              <article style="padding:32px 28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 06</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Launch &amp; Evolve</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Zero-downtime production deployment, telemetry integration, analytics tracking, and continuous sprint cycles to adapt to user feedback.</p>
              </article>
            </div>
            '''
            wrap.append(BeautifulSoup(method_html, 'html.parser'))

    # 8. COLLABORATION (#confiance)
    conf = soup.find('section', id='confiance')
    if conf:
        t = conf.find('h2', id='t-confiance')
        if t:
            t.clear()
            t.append(BeautifulSoup('A good process makes <span class="baila">good collaboration</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = conf.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">07</span>Principles', 'html.parser'))

        wrap = conf.find('div', class_='wrap')
        if wrap:
            head = wrap.find('header', class_='head')
            wrap.clear()
            wrap.append(head)

            collab_html = '''
            <div class="nouvelles" data-reveal style="--d:.08s;margin-top:40px;">
              <p style="font-size:1.25rem;line-height:1.6;color:#111111;max-width:760px;margin-bottom:36px;font-weight:500;">
                We run high-velocity sprints with complete transparency. Direct access to builders, visible git milestones, and structured feedback ensure frictionless execution.
              </p>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;width:100%;">
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">01 — SCOPE CLARITY</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Explicit Sprints</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Every sprint starts with defined deliverables, explicit time allocations, and agreed acceptance criteria before code is written.</p>
                </div>
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">02 — CONTINUOUS DEMOS</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Weekly Deployments</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Live preview URLs on every branch. You test and interact with actual running software continuously, catching nuances early.</p>
                </div>
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">03 — DIRECT FOUNDER ACCESS</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Zero Middlemen</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">You communicate directly with senior product designers and software architects—no account managers or distorted relay chains.</p>
                </div>
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">04 — OWNERSHIP &amp; CODE</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Clean Repository</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Complete IP ownership from day one. You receive thoroughly documented, typed, linted, and production-ready source code.</p>
                </div>
              </div>
            </div>
            '''
            wrap.append(BeautifulSoup(collab_html, 'html.parser'))

    # 9. INSIGHTS (#actualites)
    act = soup.find('section', id='actualites')
    if act:
        wrap = act.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            act_html = '''
            <header class="head">
              <p class="head__k label"><span class="head__n">08</span>Insights</p>
              <h2 class="head__t" data-reveal="" id="t-journal">Notes on building <span class="baila">intelligent software</span>.<span aria-hidden="true" class="etoile"></span></h2>
              <div class="head__side" data-reveal="" style="--d:.1s">
                <p class="head__i" style="font-size:1.15rem;line-height:1.55;color:#27272a;">Thoughts on product engineering, applied AI architectures, and craft from the Quiet Studio team.</p>
              </div>
            </header>
            <div class="jca" id="jca-rail" data-carrousel style="margin-top:40px;">
              <article class="actu" data-cat="product" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/hero-minimalist.jpg" alt="Product Thinking" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Product</span><span>5 min read</span><time datetime="2026-11-01">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">Why AI-native products need better product thinking.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">Wrapping an LLM in a chatbot modal isn't product design. Real intelligence must solve user friction inside the primary loop.</p>
              </article>
              <article class="actu" data-cat="engineering" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/hero-holum.jpg" alt="Engineering" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Engineering</span><span>6 min read</span><time datetime="2026-11-03">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">The death of the Figma handoff: design engineering in 2026.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">Why the most resilient software teams eliminate static mockups in favor of live code prototypes and tokenized design systems.</p>
              </article>
              <article class="actu" data-cat="ai" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/fintech-identity.jpg" alt="Applied AI" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Applied AI</span><span>4 min read</span><time datetime="2026-11-05">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">Building local-first software with quantized LLM runtimes.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">How running quantized models on client hardware unlocks zero latency, total privacy, and offline cognitive workspaces.</p>
              </article>
            </div>
            '''
            wrap.append(BeautifulSoup(act_html, 'html.parser'))

    # 10. FAQ (#faq)
    faq = soup.find('section', id='faq')
    if faq:
        t = faq.find('h2', id='t-faq')
        if t:
            t.clear()
            t.append(BeautifulSoup('A few things you <span class="baila">might want to know</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = faq.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">09</span>FAQ', 'html.parser'))

        faq_list = faq.find('div', class_='faq__list')
        if faq_list:
            faq_list.clear()
            faq_html = '''
            <details class="qa" name="faq" open="">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">What is Quiet Studio?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Quiet Studio is an independent design and software product studio. We partner with founders and engineering leaders to conceive, design, and build digital products, custom web applications, and applied AI software.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">Are you an advertising or communications agency?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">No. We are not a communications agency, ad agency, or social media manager. We are a design and software product studio. Our core output is working software, design systems, applied AI runtimes, and high-craft user interfaces.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">How do product sprints work?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">We operate in structured weekly sprints with clear milestone deliverables, continuous live staging URLs, and daily updates. You collaborate directly with principal designers and engineers.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">What technology stacks do you specialize in?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Our primary engineering stack is TypeScript, Next.js 15, React, Tailwind CSS, PostgreSQL, and Node.js. For applied AI and edge systems, we leverage Python, PyTorch, local quantized models (GGUF/ONNX), WebGPU, and vector databases.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">How does Quiet Studio integrate AI into products?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">We prioritize genuine utility over novelty. This includes autonomous agent pipelines, context-aware retrieval (RAG), automated data transformation, and private on-device intelligence that reduces user toil.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">Who owns the intellectual property and code?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">You retain 100% ownership of all code, assets, schemas, design files, and IP produced during our partnership. Everything is transferred to your repositories upon sprint completion.</p></div>
            </details>
            '''
            faq_list.append(BeautifulSoup(faq_html, 'html.parser'))

    # 11. CTA SECTION (.cta)
    cta = soup.find('section', class_='cta')
    if cta:
        cta.clear()
        cta_html = '''
        <div class="wrap cta__in">
          <h2 class="cta__t" data-reveal="" id="t-cta">
            Ideas into <span class="baila">intelligent software</span>.<span aria-hidden="true" class="etoile"></span>
          </h2>
          <div class="cta__side" data-reveal="" style="--d:.1s">
            <p class="lead" style="color:rgba(255,255,255,0.85);font-size:1.15rem;line-height:1.55;">
              Ready to ship? Tell us about your product vision, technical requirements and target timeline.
            </p>
            <a class="btn btn--papaye" data-cta="contactez-nous" href="#contact" style="background:#ff5a1f;color:#ffffff;border:none;border-radius:9999px;font-weight:700;padding:14px 28px;display:inline-flex;align-items:center;gap:10px;text-decoration:none;">
              <span>Start a project</span>
              <span aria-hidden="true" class="btn__arrow"><svg fill="none" viewbox="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"></path></svg></span>
            </a>
            <p class="cta__direct" style="margin-top:16px;">
              <a href="mailto:hello@thequietstudio.space" style="color:#ffffff;font-weight:600;text-decoration:none;">hello@thequietstudio.space</a>
            </p>
          </div>
        </div>
        '''
        cta.append(BeautifulSoup(cta_html, 'html.parser'))

    # 12. FOOTER (#contact / .pied)
    pied = soup.find('footer', class_='pied')
    if pied:
        pied.clear()
        footer_html = '''
        <div class="wrap" style="padding:80px 0 60px;">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:48px;padding-bottom:60px;border-bottom:1px solid rgba(255,255,255,0.12);">
            <div style="max-width:440px;">
              <span style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;display:inline-block;letter-spacing:-0.03em;margin-bottom:16px;">
                QUIET STUDIO<span style="color:#ff5a1f;">.</span>
              </span>
              <p style="color:rgba(255,255,255,0.75);font-size:1.05rem;line-height:1.6;margin-bottom:24px;">
                Ideas into intelligent products. An independent design and software product studio helping founders turn complex problems into working software.
              </p>
              <a href="#contact" class="cmd" style="background:#ff5a1f;color:#ffffff;border:none;border-radius:9999px;padding:12px 24px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
                <span>Start a project</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
            
            <div style="display:flex;flex-wrap:wrap;gap:48px;">
              <div>
                <h4 style="color:var(--papaye);font:700 12px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Navigation</h4>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.95rem;">
                  <li><a href="#squad" style="color:rgba(255,255,255,0.85);text-decoration:none;">The Squad</a></li>
                  <li><a href="#software" style="color:rgba(255,255,255,0.85);text-decoration:none;">Software Suite</a></li>
                  <li><a href="#expertises" style="color:rgba(255,255,255,0.85);text-decoration:none;">Practices</a></li>
                  <li><a href="#realisations" style="color:rgba(255,255,255,0.85);text-decoration:none;">Selected Work</a></li>
                  <li><a href="#method" style="color:rgba(255,255,255,0.85);text-decoration:none;">The Method</a></li>
                  <li><a href="#actualites" style="color:rgba(255,255,255,0.85);text-decoration:none;">Insights</a></li>
                  <li><a href="#faq" style="color:rgba(255,255,255,0.85);text-decoration:none;">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 style="color:var(--papaye);font:700 12px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Products Mode</h4>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.95rem;">
                  <li><a href="/#apps" style="color:rgba(255,255,255,0.85);text-decoration:none;">Open Core Apps</a></li>
                  <li><a href="/blog" style="color:rgba(255,255,255,0.85);text-decoration:none;">Blog &amp; Notes</a></li>
                  <li><a href="/#foundations" style="color:rgba(255,255,255,0.85);text-decoration:none;">Foundations</a></li>
                  <li><a href="/about" style="color:rgba(255,255,255,0.85);text-decoration:none;">About Quiet Studio</a></li>
                </ul>
              </div>

              <div>
                <h4 style="color:var(--papaye);font:700 12px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Direct Contact</h4>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.95rem;">
                  <li><a href="mailto:hello@thequietstudio.space" style="color:rgba(255,255,255,0.85);text-decoration:none;">hello@thequietstudio.space</a></li>
                  <li><span style="color:rgba(255,255,255,0.5);">San Francisco · London · Tokyo</span></li>
                  <li><span style="color:rgba(255,255,255,0.5);">Remote-First Worldwide</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div style="padding-top:32px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;color:rgba(255,255,255,0.5);font-size:0.88rem;">
            <span>Thoughtfully conceived. Carefully designed. Intelligently built.</span>
            <span>&copy; 2026 Quiet Studio. All rights reserved.</span>
          </div>
        </div>
        '''
        pied.append(BeautifulSoup(footer_html, 'html.parser'))

    # Extract cleaned body content
    body = soup.find('body')
    content = "".join([str(c) for c in body.children if str(c).strip()])

    # Comprehensive purge of Bitwip, communication agency jargon, and French territories
    content = content.replace('Bitwip', 'Quiet Studio')
    content = content.replace('bitwip', 'quietstudio')
    content = content.replace('communications agency', 'design & software product studio')
    content = content.replace('Communications agency', 'Design & software product studio')
    content = content.replace('communication strategy', 'product & design strategy')
    content = content.replace('Communication strategy', 'Product & design strategy')
    content = content.replace('communication', 'design & software engineering')
    content = content.replace('Communication', 'Design & Software Engineering')
    content = content.replace('media plan', 'software architecture')
    content = content.replace('Media plan', 'Software Architecture')
    content = content.replace('Media buying', 'Full-Stack Architecture')
    content = content.replace('Social ads', 'Product Design Systems')
    content = content.replace('Overseas France', 'Worldwide')
    content = content.replace('overseas France', 'worldwide')
    content = content.replace('French-speaking world', 'Global Ecosystem')
    content = content.replace('French Guiana', 'San Francisco')
    content = content.replace('French-speaking', 'International')
    content = content.replace('French', 'Universal')
    content = content.replace('Guyane', 'Studio')
    content = content.replace('guyane', 'studio')
    content = content.replace('Martinique', 'New York')
    content = content.replace('Guadeloupe', 'London')
    content = content.replace('Réunion', 'Tokyo')
    content = content.replace('09 80 80 82 42', '')

    # Export to client/src/components/bitwip-html.ts
    escaped = json.dumps(content)
    ts_code = f'export const BITWIP_BODY_HTML = {escaped};\n'
    with open('client/src/components/bitwip-html.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print(f"Generated client/src/components/bitwip-html.ts ({len(ts_code)} bytes)")

if __name__ == '__main__':
    build_product_studio()
