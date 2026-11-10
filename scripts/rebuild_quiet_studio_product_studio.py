import re
import os
import json
from bs4 import BeautifulSoup

def build_product_studio():
    # Read the base Bitwip structure from bitwip-site-main
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
        # Title
        t = hh.find('h1', class_='hh__titre')
        if t:
            t.clear()
            sr = soup.new_tag('span', **{'class': 'sr-only'})
            sr.string = 'Quiet Studio | Independent Product & AI Studio'
            t.append(sr)

            lead = soup.new_tag('span', **{'class': 'mj__lead', 'aria-hidden': 'true'})
            lead.string = 'INDEPENDENT PRODUCT & AI STUDIO'
            t.append(lead)

            # Line 1: "Ideas into"
            # Letters: I-d-e-a-s (0-4), space, i-n-t-o (5-8)
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
            if glead: glead.string = 'INDEPENDENT PRODUCT & AI STUDIO'
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

        # Global clocks
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

        # Manifest paragraph with exact .hh__w spans for p-hero-accueil.js animation!
        manif = hh.find('p', class_='hh__manif')
        if manif:
            manif.clear()
            # New AI-Native Product Studio manifesto with kinetic spans:
            # "We design, build and evolve digital products, software and AI systems that turn complex ideas into working reality."
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
              So we built an autonomous studio squad combining human senior direction, Claude 3.7 reasoning, and token-driven engineering to ship it for you.
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
                Engineers, product designers, and AI specialists operating with extreme craft, zero bloat, and fast delivery cycles.
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

    # 3. STUDIO PHILOSOPHY (#agence)
    ag = soup.find('section', id='agence')
    if ag:
        t = ag.find('h2', id='t-agence')
        if t:
            t.clear()
            t.append(BeautifulSoup('Good products begin with <span class="baila">good questions</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = ag.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">02</span>Philosophy', 'html.parser'))

        wrap = ag.find('div', class_='wrap')
        if wrap:
            side = wrap.find('div', class_='head__side')
            if side:
                p = side.find('p', class_='head__i')
                if p:
                    p.clear()
                    p.append(BeautifulSoup('Quiet Studio is an independent product and AI studio helping founders and businesses turn ideas, complex problems and opportunities into useful digital products, software and intelligent systems.', 'html.parser'))

            corps = wrap.find('div', class_='agence__corps')
            if corps:
                corps.clear()
                philo_body = '''
                <div class="nouvelles" data-reveal style="--d:.08s;margin-top:32px;">
                  <p class="agence__lead" style="font-size:1.35rem;line-height:1.6;color:#111111;max-width:800px;font-weight:600;margin-bottom:32px;">
                    We work at the intersection of Product Thinking, Modern Design, Software Engineering, Applied AI, and Brand. Rather than separating strategy from implementation, we unite them under one roof.
                  </p>
                  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;width:100%;">
                    <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                      <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">01 — PRODUCT THINKING</span>
                      <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">What &amp; Why</h4>
                      <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Understanding the actual user problem, architectural feasibility, and core loop before writing a line of code or designing a single screen.</p>
                    </div>
                    <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                      <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">02 — CONNECTED CRAFT</span>
                      <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Zero Handoff Walls</h4>
                      <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Designers who code and engineers with an eye for typography, physics, and tactile feedback. Every interaction feels deliberate and physical.</p>
                    </div>
                    <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                      <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">03 — APPLIED AI UTILITY</span>
                      <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Genuinely Useful</h4>
                      <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">We deploy applied intelligence where it enhances workflows—local vector memory, reasoning agents, and automated synthesis—rejecting gimmicky chatbot slop.</p>
                    </div>
                    <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                      <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">04 — HIGH VELOCITY</span>
                      <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Working Software</h4>
                      <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Rapid structured sprints delivering production Next.js apps, robust schemas, and test-verified code rather than endless slide decks.</p>
                    </div>
                  </div>
                </div>
                '''
                corps.append(BeautifulSoup(philo_body, 'html.parser'))

    # 4. PRACTICES / SERVICES (#expertises)
    exp = soup.find('section', id='expertises')
    if exp:
        t = exp.find('h2', id='t-expertises')
        if t:
            t.clear()
            t.append(BeautifulSoup('Four disciplines, one <span class="baila">unified studio</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = exp.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">03</span>Practices', 'html.parser'))

        side = exp.find('div', class_='head__side')
        if side:
            p = side.find('p', class_='head__i')
            if p:
                p.clear()
                p.append(BeautifulSoup('From first product brief to deployed software: strategy, engineering, applied AI, and brand experience.', 'html.parser'))

        # Replace the 4 services with the 4 AI-Native Product Practices
        # And remove old case study vitrines (.xvit)
        for vit in exp.find_all('div', class_='xvit'):
            vit.decompose()

        xep_items = exp.find_all('article', class_='xep')
        practices_data = [
            {
                'num': '01',
                'title': 'Product Strategy & Design',
                'desc': 'We translate ambiguous opportunities and complex problems into clear product architecture, intuitive interfaces, and high-fidelity prototypes.',
                'deliverables': ['Product Requirements (PRDs)', 'UX/UI & Interaction Design', 'Interactive Figma & React Prototypes', 'Design Systems & Token Architecture']
            },
            {
                'num': '02',
                'title': 'Software & Product Engineering',
                'desc': 'We turn concepts into robust, production-grade applications. Clean architectures, modern stacks, and exceptional performance across all viewports.',
                'deliverables': ['Full-Stack Next.js 15 & React', 'TypeScript & API Engineering', 'Database Architecture & PostgreSQL', 'Real-time Dashboards & Workspaces']
            },
            {
                'num': '03',
                'title': 'Applied AI & Intelligent Systems',
                'desc': 'We architect and integrate intelligent systems that provide measurable value: autonomous workflows, contextual agents, and local quantized inference.',
                'deliverables': ['RAG & Semantic Retrieval Engines', 'Autonomous Copilots & Multi-Agent Workflows', 'Quantized Edge Inference & Local Models', 'Document Processing & Intelligence Pipelines']
            },
            {
                'num': '04',
                'title': 'Brand, Experience & Launch',
                'desc': 'A product is only as impactful as its clarity. We create the visual identity, tone of voice, narrative, and marketing presence to bring it to market.',
                'deliverables': ['Product Positioning & Narrative', 'Visual Identity & Design Systems', 'High-Converting Landing Pages', 'Product Launch Materials & Pitch Decks']
            }
        ]

        for i, article in enumerate(xep_items[:4]):
            data = practices_data[i]
            # Title
            t_el = article.find('h3', class_='xep__t')
            if t_el:
                link = t_el.find('a')
                if link:
                    link.string = data['title']
                    link['href'] = '#contact'
            # Desc
            d_el = article.find('p', class_='xep__d')
            if d_el:
                d_el.string = data['desc']

            # Deliverables tags list
            ul = article.find('ul', class_='xep__ss')
            if ul:
                ul.clear()
                for item in data['deliverables']:
                    li = soup.new_tag('li')
                    li_link = soup.new_tag('a', href='#contact')
                    li_link.string = item
                    li.append(li_link)
                    ul.append(li)

    # 5. PORTFOLIO / SELECTED WORK (#realisations)
    real = soup.find('section', id='realisations')
    if real:
        t = real.find('h2', id='t-realisations')
        if t:
            t.clear()
            t.append(BeautifulSoup('Software and intelligent systems <span class="baila">built to work</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = real.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">04</span>Selected Work', 'html.parser'))

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
                    'title': 'Capture Desktop',
                    'tag': 'In-House Product',
                    'cat': 'Cognitive Workspace',
                    'desc': 'A local-first desktop OS and cognitive workspace designed for deep work. Features offline-first vector storage, sub-50ms fuzzy recall, and semantic context threading.',
                    'img': '/assets/quiet/fintech-identity.jpg'
                },
                {
                    'title': 'Aethel Runtime',
                    'tag': 'AI System',
                    'cat': 'Autonomous Agents',
                    'desc': 'A context-aware multi-agent orchestration runtime with discrete authority gating, cryptographic audit logs, and deterministic verification protocols.',
                    'img': '/assets/quiet/startup-presentation.jpg'
                },
                {
                    'title': 'Resonance OS',
                    'tag': 'Studio Product',
                    'cat': 'Adaptive Intelligence',
                    'desc': 'An adaptive learning platform using active recall graphs and evidence-based feedback loops to dramatically accelerate complex software mastery.',
                    'img': '/assets/quiet/product-brand.jpg'
                },
                {
                    'title': 'Zen AI Engine',
                    'tag': 'Core Technology',
                    'cat': 'Quantized Inference',
                    'desc': 'High-throughput quantized edge inference engine running large multimodal models directly on Apple Silicon and browser WebGPU with zero cloud latency.',
                    'img': '/assets/quiet/digital-editorial.jpg'
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

    # 6. HOW WE WORK / THE METHOD (Replacing #territoires / French locations)
    terr = soup.find('section', id='territoires')
    if terr:
        terr['id'] = 'method'
        wrap = terr.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            method_html = '''
            <header class="head head--seul">
              <p class="head__k label"><span class="head__n">05</span>The Method</p>
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

    # 7. COLLABORATION (#confiance)
    conf = soup.find('section', id='confiance')
    if conf:
        t = conf.find('h2', id='t-confiance')
        if t:
            t.clear()
            t.append(BeautifulSoup('A good process makes <span class="baila">good collaboration</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = conf.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">06</span>Principles', 'html.parser'))

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

    # 8. INSIGHTS (#actualites)
    act = soup.find('section', id='actualites')
    if act:
        wrap = act.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            act_html = '''
            <header class="head">
              <p class="head__k label"><span class="head__n">07</span>Insights</p>
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

    # 9. FAQ (#faq)
    faq = soup.find('section', id='faq')
    if faq:
        t = faq.find('h2', id='t-faq')
        if t:
            t.clear()
            t.append(BeautifulSoup('A few things you <span class="baila">might want to know</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = faq.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">08</span>FAQ', 'html.parser'))

        faq_list = faq.find('div', class_='faq__list')
        if faq_list:
            faq_list.clear()
            faq_html = '''
            <details class="qa" name="faq" open="">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">What is Quiet Studio?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Quiet Studio is an independent product and AI studio. We partner with founders, businesses, and engineering leaders to conceive, design, and build digital products, custom software, and applied AI systems.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">How do product sprints work?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">We operate in structured weekly sprints with clear milestone deliverables, continuous live staging URLs, and daily asynchronous updates. You collaborate directly with principal designers and engineers.</p></div>
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
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">How do we begin a project?<span aria-hidden="true" class="qa__ico"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Reach out via our contact form or book an introductory discovery sprint. We will evaluate your product goals, define an architectural roadmap, and align on timeline and scope.</p></div>
            </details>
            '''
            faq_list.append(BeautifulSoup(faq_html, 'html.parser'))

    # 10. CTA SECTION (.cta)
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

    # 11. FOOTER (#contact / .pied)
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
                Ideas into intelligent products. An independent product and AI studio helping founders turn complex problems into useful software.
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

    # Extract final cleaned body content
    body = soup.find('body')
    content = "".join([str(c) for c in body.children if str(c).strip()])

    # Double check for any leftover Bitwip or French text
    content = content.replace('Bitwip', 'Quiet Studio')
    content = content.replace('bitwip', 'quietstudio')
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
