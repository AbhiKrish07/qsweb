import os
import re
import json
from bs4 import BeautifulSoup

def build_stitched_quiet_studio():
    source_path = '/Users/abhivalo360gmail.com/Downloads/quiet-studio/bitwip-site-main copy/index.html'
    if not os.path.exists(source_path):
        source_path = 'bitwip-site-main/index.html'

    with open(source_path, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    # Remove any old nav element
    old_nav = soup.find('header', class_='nav')
    if old_nav:
        old_nav.decompose()

    old_menu = soup.find('div', id='menu')
    if old_menu:
        old_menu.decompose()

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

        # Ghost / Fantome Layer (.mj__fantome)
        fantome = hh.find('div', class_='mj__fantome')
        if fantome:
            glead = fantome.find('div', class_='mj__lead')
            if glead: glead.string = 'DESIGN & PRODUCT SOFTWARE STUDIO'
            
            fl1 = fantome.find('div', class_='mj__l1')
            if fl1:
                pile = fl1.find('span', class_='mj__pile')
                fl1.clear()
                m1 = BeautifulSoup('<span aria-hidden="true" class="mj__m"><span class="mj__c" style="--r:0">I</span><span class="mj__c" style="--r:1">d</span><span class="mj__c" style="--r:2">e</span><span class="mj__c" style="--r:3">a</span><span class="mj__c" style="--r:4">s</span></span>', 'html.parser')
                trou = soup.new_tag('span', **{'class': 'mj__trou'})
                if pile:
                    trou.append(pile)
                m2 = BeautifulSoup('<span aria-hidden="true" class="mj__m"><span class="mj__c" style="--r:5">i</span><span class="mj__c" style="--r:6">n</span><span class="mj__c" style="--r:7">t</span><span class="mj__c" style="--r:8">o</span></span>', 'html.parser')
                fl1.append(m1)
                fl1.append(trou)
                fl1.append(m2)

            fl2 = fantome.find('div', class_='mj__l2')
            if fl2:
                fl2.clear()
                l2_ghost = BeautifulSoup('''<span aria-hidden="true" class="mj__m"><span class="mj__c" style="--r:9">i</span><span class="mj__c" style="--r:10">n</span><span class="mj__c" style="--r:11">t</span><span class="mj__c" style="--r:12">e</span><span class="mj__c" style="--r:13">l</span><span class="mj__c" style="--r:14">l</span><span class="mj__c" style="--r:15">i</span><span class="mj__c" style="--r:16">g</span><span class="mj__c" style="--r:17">e</span><span class="mj__c" style="--r:18">n</span><span class="mj__c" style="--r:19">t</span></span> <span class="mj__trou"></span> <span aria-hidden="true" class="mj__m"><span class="mj__c" style="--r:20">p</span><span class="mj__c" style="--r:21">r</span><span class="mj__c" style="--r:22">o</span><span class="mj__c" style="--r:23">d</span><span class="mj__c" style="--r:24">u</span><span class="mj__c" style="--r:25">c</span><span class="mj__c" style="--r:26">t</span><span class="mj__c" style="--r:27">s</span><span class="mj__c" style="--r:28">.</span></span><span class="etoile mj__etoile"></span>''', 'html.parser')
                fl2.append(l2_ghost)

        # Curtain Layer
        copie = hh.find('div', class_='mj__copie')
        if copie:
            clead = copie.find('div', class_='mj__lead')
            if clead: clead.string = 'DESIGN & PRODUCT SOFTWARE STUDIO'
            cl1 = copie.find('div', class_='mj__l1')
            if cl1:
                cl1.clear()
                cl1.append(BeautifulSoup('''<span class="mj__m"><span class="mj__c" style="--r:0">I</span><span class="mj__c" style="--r:1">d</span><span class="mj__c" style="--r:2">e</span><span class="mj__c" style="--r:3">a</span><span class="mj__c" style="--r:4">s</span></span> <span class="mj__trou"></span> <span class="mj__m"><span class="mj__c" style="--r:5">i</span><span class="mj__c" style="--r:6">n</span><span class="mj__c" style="--r:7">t</span><span class="mj__c" style="--r:8">o</span></span>''', 'html.parser'))
            cl2 = copie.find('div', class_='mj__l2')
            if cl2:
                cl2.clear()
                cl2.append(BeautifulSoup('''<span class="mj__m"><span class="mj__c" style="--r:9">i</span><span class="mj__c" style="--r:10">n</span><span class="mj__c" style="--r:11">t</span><span class="mj__c" style="--r:12">e</span><span class="mj__c" style="--r:13">l</span><span class="mj__c" style="--r:14">l</span><span class="mj__c" style="--r:15">i</span><span class="mj__c" style="--r:16">g</span><span class="mj__c" style="--r:17">e</span><span class="mj__c" style="--r:18">n</span><span class="mj__c" style="--r:19">t</span></span> <span class="mj__trou"></span> <span class="mj__m"><span class="mj__c" style="--r:20">p</span><span class="mj__c" style="--r:21">r</span><span class="mj__c" style="--r:22">o</span><span class="mj__c" style="--r:23">d</span><span class="mj__c" style="--r:24">u</span><span class="mj__c" style="--r:25">c</span><span class="mj__c" style="--r:26">t</span><span class="mj__c" style="--r:27">s</span><span class="mj__c" style="--r:28">.</span></span><span class="etoile mj__etoile"></span>''', 'html.parser'))

        # Live Clocks
        clocks = hh.find('div', class_='clocks')
        if clocks:
            clocks['aria-label'] = 'Global Engineering & Design Time Zones'
            clocks.clear()
            clocks_html = '''
            <a class="clock" href="#about"><span class="clock__city">San Francisco</span><span class="clock__time c-time" data-tz="America/Los_Angeles">--:--</span><span class="sr-only">, San Francisco Time</span></a>
            <a class="clock" href="#about"><span class="clock__city">New York</span><span class="clock__time c-time" data-tz="America/New_York">--:--</span><span class="sr-only">, New York Time</span></a>
            <a class="clock" href="#about"><span class="clock__city">London</span><span class="clock__time c-time" data-tz="Europe/London">--:--</span><span class="sr-only">, London Time</span></a>
            <a class="clock" href="#about"><span class="clock__city">Tokyo</span><span class="clock__time c-time" data-tz="Asia/Tokyo">--:--</span><span class="sr-only">, Tokyo Time</span></a>
            <a class="clock" href="#about"><span class="clock__city">Bengaluru</span><span class="clock__time c-time" data-tz="Asia/Kolkata">--:--</span><span class="sr-only">, Bengaluru Time</span></a>
            '''
            clocks.append(BeautifulSoup(clocks_html, 'html.parser'))

        # Kinetic manifestation sentence
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

    # 2. ABOUT THE STUDIO (#agence)
    ag = soup.find('section', id='agence')
    if ag:
        t = ag.find('h2', id='t-agence')
        if t:
            t.clear()
            t.append(BeautifulSoup('Good products begin with <span class="baila">good questions</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = ag.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">01</span>About the Studio', 'html.parser'))

        sensee = ag.find('div', class_='sensee')
        if sensee:
            sensee.clear()
            sensee_html = '''
            <div class="sensee__txt" data-reveal="">
              <p class="sensee__lead" style="color:#111111;font-size:clamp(1.25rem,2vw,1.65rem);font-weight:600;line-height:1.55;margin-bottom:24px;">
                Quiet Studio is an independent AI-native product and creative studio. We conceive, design and engineer digital products, open-core software, and applied AI systems with obsessive craft and zero ceremony.
              </p>
              <p class="sensee__p" style="color:#27272a;font-size:1.05rem;line-height:1.7;margin-bottom:28px;">
                We combine human creative direction with intelligent AI-assisted workflows to make thoughtful creative work and software more accessible, consistent and efficient. No handoff walls, no bloated agency meetings—just senior builders shipping working software.
              </p>
              <a class="lnk sensee__btn" href="#expertises" style="font-weight:600;display:inline-flex;align-items:center;gap:8px;">
                Explore our services
                <svg fill="none" viewbox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"></path></svg>
              </a>
            </div>

            <dl class="sensee__chiffres" data-counts="" data-reveal="" style="--d:.1s">
              <div class="sc">
                <dt class="sr-only">Products &amp; Tools</dt>
                <dd>
                  <span class="sc__n"><span aria-hidden="true" class="sc__plus">+</span><span data-count="12">12</span></span>
                  <span aria-hidden="true" class="sc__l label">Products &amp; Tools</span>
                </dd>
              </div>
              <div class="sc">
                <dt class="sr-only">Production Uptime</dt>
                <dd>
                  <span class="sc__n"><span data-count="99">99</span><span aria-hidden="true" class="sc__plus">.9%</span></span>
                  <span aria-hidden="true" class="sc__l label">Telemetry Uptime</span>
                </dd>
              </div>
              <div class="sc">
                <dt class="sr-only">Edge Latency</dt>
                <dd>
                  <span class="sc__n"><span aria-hidden="true" class="sc__plus">&lt;</span><span data-count="50">50</span><span aria-hidden="true" class="sc__plus">ms</span></span>
                  <span aria-hidden="true" class="sc__l label">Edge Inference</span>
                </dd>
              </div>
              <div class="sc">
                <dt class="sr-only">Senior Builders</dt>
                <dd>
                  <span class="sc__n"><span aria-hidden="true" class="sc__plus">+</span><span data-count="8">8</span></span>
                  <span aria-hidden="true" class="sc__l label">Senior Builders</span>
                </dd>
              </div>
            </dl>
            '''
            sensee.append(BeautifulSoup(sensee_html, 'html.parser'))

        ag_vie = ag.find('div', class_='ag-vie')
        if ag_vie:
            ag_vie.clear()
            gallery_html = '''
            <div class="ag-vie__bande" role="group" style="padding:24px 0 12px;">
              <ul class="ag-vie__piste" style="display:flex;gap:20px;list-style:none;padding:0;margin:0;overflow-x:auto;">
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/hero-studio-craft.jpg" alt="Quiet Studio Design System &amp; Component Library" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/fintech-identity.jpg" alt="Zen AI Local Engine Architecture" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/project-atlas.jpg" alt="Capture Desktop Local Cognitive OS" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/product-brand.jpg" alt="Resonance OS Adaptive Learning System" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/digital-editorial.jpg" alt="Aethel Multi-Agent Orchestration Engine" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.06);">
                  <img src="/assets/quiet/startup-presentation.jpg" alt="Titan Analytics Telemetry Dashboard" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
              </ul>
            </div>
            '''
            ag_vie.append(BeautifulSoup(gallery_html, 'html.parser'))

    # 3. OUR SERVICES ACCORDION (#expertises) — EXACT MATCH TO USER SCREENSHOT 1
    exp = soup.find('section', id='expertises')
    if exp:
        exp.clear()
        services_section_html = '''
        <div class="wrap" style="padding:100px 0 120px;">
          <header class="head" style="margin-bottom:60px;">
            <h2 class="head__t" id="t-services" style="font-family:'Epure Titres',serif,sans-serif;font-size:clamp(3.5rem,7vw,6.5rem);font-weight:400;letter-spacing:-0.03em;color:#ffffff;display:flex;align-items:center;gap:12px;">
              Our services<span style="font-family:'Cabinet Grotesk',sans-serif;color:#ffffff;">.</span>
              <span aria-hidden="true" class="etoile" style="display:inline-block;width:32px;height:32px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
            </h2>
          </header>

          <div class="quiet-services-accordion" style="display:flex;flex-direction:column;gap:0;border-top:1px solid rgba(255,255,255,0.12);">
            <!-- Item 1: Product Design & Systems (Expanded by default matching screenshot) -->
            <details class="qs-service-row" open style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#a3e635;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">Product Design &amp; Systems</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:#ff5a1f;display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:24px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;display:none;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  UX/UI &amp; Interface Architecture /<br>
                  Design Systems &amp; Token Libraries /<br>
                  Interaction Physics &amp; Micro-interactions /<br>
                  Tactile Click &amp; Audio Feedback /<br>
                  Interactive Figma &amp; React Prototypes
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ffffff;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;transition:color 0.2s ease;">
                  <span>Give your design &amp; software engineering a clear structure</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>

            <!-- Item 2: Full-Stack Software Engineering -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#fda4af;-webkit-mask-image:url(/assets/img/formes/fleur.svg);mask-image:url(/assets/img/formes/fleur.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">Full-Stack Software Engineering</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:22px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;display:none;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  Next.js 15 &amp; React Server Components /<br>
                  High-Performance TypeScript Backends /<br>
                  PostgreSQL &amp; Scalable Schema Architecture /<br>
                  Local-First &amp; Offline Data Synchronization /<br>
                  Zero-Latency Edge APIs &amp; WebSockets
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ffffff;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                  <span>Turn product vision into bulletproof production software</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/fleur.svg);mask-image:url(/assets/img/formes/fleur.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>

            <!-- Item 3: Applied AI & Intelligent Systems -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#4ade80;-webkit-mask-image:url(/assets/img/formes/trefle.svg);mask-image:url(/assets/img/formes/trefle.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">Applied AI &amp; Intelligent Systems</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:22px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;display:none;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  Deterministic Multi-Agent Swarms /<br>
                  Quantized Local &amp; Edge LLM Inference /<br>
                  Context-Engineered RAG &amp; Knowledge Graphs /<br>
                  Continuous Evaluation &amp; Anti-Hallucination Guardrails /<br>
                  Automated Creative &amp; Code Generation Pipelines
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ffffff;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                  <span>Deploy AI that actually does real work with high precision</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/trefle.svg);mask-image:url(/assets/img/formes/trefle.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>

            <!-- Item 4: Brand Identity & Product Narrative -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#c084fc;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">Brand Identity &amp; Product Narrative</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:22px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;display:none;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  Visual World &amp; Identity Architecture /<br>
                  Typography, Grid &amp; Aesthetic Direction /<br>
                  Product Positioning &amp; Manifesto Copywriting /<br>
                  Launch Systems &amp; High-Conversion Landing Pages /<br>
                  Design Artifacts, Guidelines &amp; Brand Tokens
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ffffff;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                  <span>Make your product impossible to ignore from day one</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>
          </div>
        </div>
        '''
        exp.append(BeautifulSoup(services_section_html, 'html.parser'))

    # 4. BEFORE & AFTER QUIET STUDIO (Replacing #confiance)
    conf = soup.find('section', id='confiance')
    if conf:
        conf['class'] = ['sec', 'papier', 'qs-before-after-sec']
        conf.clear()
        before_after_html = '''
        <div class="wrap" style="padding:100px 0 110px;max-width:1120px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:50px;">
            <h2 style="font:800 clamp(3.2rem,6vw,5.5rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#111111;margin-bottom:24px;">
              Before &amp; after Quiet Studio
            </h2>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:9999px;background:#e0f2fe;color:#0284c7;font:700 11px/1 'DM Mono',monospace;letter-spacing:0.06em;text-transform:uppercase;">
              REFRESHING TIRED CREATIVE &amp; SOFTWARE
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;align-items:stretch;margin-bottom:32px;">
            <!-- Left Card: Before Quiet Studio -->
            <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:28px;padding:44px 38px;box-shadow:0 12px 36px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <h3 style="font:800 28px/1.1 'Cabinet Grotesk',sans-serif;color:#111111;margin:0 0 6px;">Before Quiet Studio</h3>
                <p style="font-size:15px;color:#71717a;margin:0 0 36px;font-weight:500;">The old agency way</p>

                <div style="display:flex;flex-direction:column;gap:24px;border-top:1px solid #f4f4f5;padding-top:24px;">
                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#f4f4f5;color:#52525b;font:600 12px/1 'DM Mono',monospace;text-align:center;">1 hour</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#18181b;margin:0 0 4px;">Spot the fatigue</h4>
                      <p style="font-size:13.5px;color:#71717a;line-height:1.5;margin:0;">Comb through fragmented designs to find what is slipping.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#f4f4f5;color:#52525b;font:600 12px/1 'DM Mono',monospace;text-align:center;">2 hours</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#18181b;margin:0 0 4px;">Make replacements</h4>
                      <p style="font-size:13.5px;color:#71717a;line-height:1.5;margin:0;">Brief and design fresh variations manually from scratch.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#f4f4f5;color:#52525b;font:600 12px/1 'DM Mono',monospace;text-align:center;">30 min</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#18181b;margin:0 0 4px;">Swap them in</h4>
                      <p style="font-size:13.5px;color:#71717a;line-height:1.5;margin:0;">Pause outdated assets and manually deploy new ones.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style="border-top:1px solid #f4f4f5;padding-top:28px;margin-top:36px;display:flex;justify-content:space-between;align-items:baseline;">
                <span style="font:800 18px/1 'Cabinet Grotesk',sans-serif;letter-spacing:0.04em;text-transform:uppercase;color:#18181b;">TOTAL TIME</span>
                <span style="font:800 28px/1 'Cabinet Grotesk',sans-serif;color:#18181b;">3.5 hours</span>
              </div>
            </div>

            <!-- Right Card: After Quiet Studio -->
            <div style="background:#0252ea;border-radius:28px;padding:44px 38px;color:#ffffff;box-shadow:0 24px 60px rgba(2,82,234,0.35);display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
              <div style="position:absolute;top:28px;right:28px;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 100%);border:1px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;box-shadow:inset 0 2px 4px rgba(255,255,255,0.4);">
                <span style="font:900 18px/1 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.05em;">QS✦</span>
              </div>

              <div>
                <h3 style="font:800 28px/1.1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 6px;">After Quiet Studio</h3>
                <p style="font-size:15px;color:rgba(255,255,255,0.8);margin:0 0 36px;font-weight:500;">The new AI-native studio way</p>

                <div style="display:flex;flex-direction:column;gap:24px;border-top:1px solid rgba(255,255,255,0.18);padding-top:24px;">
                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(255,255,255,0.2);color:#ffffff;font:600 12px/1 'DM Mono',monospace;text-align:center;">Automatic</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Spot the fatigue</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.82);line-height:1.5;margin:0;">Top Creatives telemetry flags degradation before performance slips.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(255,255,255,0.2);color:#ffffff;font:600 12px/1 'DM Mono',monospace;text-align:center;">1 minute</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Generate replacements</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.82);line-height:1.5;margin:0;">Fresh on-brand variations generated with agent workflows.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(255,255,255,0.2);color:#ffffff;font:600 12px/1 'DM Mono',monospace;text-align:center;">Automatic</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Swap them in</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.82);line-height:1.5;margin:0;">Tired assets retired, verified production creative rotated in.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style="border-top:1px solid rgba(255,255,255,0.18);padding-top:28px;margin-top:36px;display:flex;justify-content:space-between;align-items:baseline;">
                <span style="font:800 18px/1 'Cabinet Grotesk',sans-serif;letter-spacing:0.04em;text-transform:uppercase;color:#ffffff;">TOTAL TIME</span>
                <span style="font:800 28px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;">~1 minute</span>
              </div>
            </div>
          </div>

          <div style="background:#111111;color:#ffffff;border-radius:20px;padding:22px 32px;text-align:center;font:600 clamp(1.1rem,1.8vw,1.4rem)/1.4 'Space Grotesk',sans-serif;box-shadow:0 16px 40px rgba(0,0,0,0.12);">
            3.5 hours of creative refresh becomes a glance and a click.
          </div>
        </div>
        '''
        conf.append(BeautifulSoup(before_after_html, 'html.parser'))

    # 5. INTERACTIVE APP WORKSPACE (Replacing #territoires)
    ter = soup.find('section', id='territoires')
    if ter:
        ter['id'] = 'workspace'
        ter['class'] = ['sec', 'qs-workspace-sec']
        ter.clear()
        workspace_html = '''
        <div class="wrap" style="padding:100px 0 120px;max-width:1160px;margin:0 auto;text-align:center;">
          <h2 style="font:800 clamp(3.2rem,6vw,5.5rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#ffffff;margin-bottom:18px;">
            Every brand's creative, in one place
          </h2>
          <p style="color:rgba(255,255,255,0.7);font-size:clamp(1.1rem,1.8vw,1.35rem);max-width:680px;margin:0 auto 50px;line-height:1.6;">
            The centralized operating system for creative production and software delivery.
          </p>

          <div class="qs-mockup-container" style="position:relative;background:#18181b;border:1px solid rgba(255,255,255,0.14);border-radius:28px;padding:32px;box-shadow:0 36px 80px rgba(0,0,0,0.6);margin:0 auto;">
            <div style="position:absolute;top:-18px;left:40px;background:#facc15;color:#18181b;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(-4deg);box-shadow:0 8px 20px rgba(250,204,21,0.3);letter-spacing:0.04em;z-index:10;">
              AD ROTATION ⚡
            </div>
            <div style="position:absolute;top:-18px;right:60px;background:#38bdf8;color:#0f172a;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(5deg);box-shadow:0 8px 20px rgba(56,189,248,0.3);letter-spacing:0.04em;z-index:10;">
              BULK UPLOAD ☁
            </div>
            <div style="position:absolute;bottom:40px;left:-20px;background:#a855f7;color:#ffffff;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(-8deg);box-shadow:0 8px 20px rgba(168,85,247,0.3);letter-spacing:0.04em;z-index:10;">
              TOP CREATIVES ✦
            </div>
            <div style="position:absolute;bottom:40px;right:-20px;background:#22c55e;color:#ffffff;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(6deg);box-shadow:0 8px 20px rgba(34,197,94,0.3);letter-spacing:0.04em;z-index:10;">
              BRAND KITS ✦
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:18px;margin-bottom:24px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="width:12px;height:12px;border-radius:50%;background:#ef4444;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#eab308;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#22c55e;display:inline-block;"></span>
                <span style="margin-left:14px;font:700 13px 'DM Mono',monospace;color:rgba(255,255,255,0.7);">app.thequietstudio.space / workspace</span>
              </div>
              <div style="display:flex;gap:12px;">
                <span style="padding:4px 10px;border-radius:6px;background:rgba(255,255,255,0.06);font:600 11px 'DM Mono',monospace;color:#ff5a1f;">CONNECTED · 5 AGENTS ACTIVE</span>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:220px 1fr;gap:24px;text-align:left;">
              <div style="border-right:1px solid rgba(255,255,255,0.08);padding-right:18px;display:flex;flex-direction:column;gap:14px;">
                <span style="font:700 11px 'DM Mono',monospace;color:rgba(255,255,255,0.4);text-transform:uppercase;">WORKSPACE</span>
                <div style="padding:8px 12px;border-radius:8px;background:rgba(255,90,31,0.15);color:#ff5a1f;font:700 13px sans-serif;">✦ Active Campaigns</div>
                <div style="padding:8px 12px;border-radius:8px;color:rgba(255,255,255,0.7);font:500 13px sans-serif;">Routines &amp; Pipelines</div>
                <div style="padding:8px 12px;border-radius:8px;color:rgba(255,255,255,0.7);font:500 13px sans-serif;">Brand Kits &amp; Guidelines</div>
                <div style="padding:8px 12px;border-radius:8px;color:rgba(255,255,255,0.7);font:500 13px sans-serif;">Telemetry &amp; Reports</div>
              </div>

              <div>
                <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-bottom:24px;">
                  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;">
                    <span style="font:600 11px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">LIVE VELOCITY</span>
                    <p style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:8px 0 0;">48h Sprints</p>
                  </div>
                  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;">
                    <span style="font:600 11px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">VARIATIONS SHIPPED</span>
                    <p style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#22c55e;margin:8px 0 0;">1,420+ Assets</p>
                  </div>
                  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;">
                    <span style="font:600 11px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">COMPLIANCE SCORE</span>
                    <p style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ff5a1f;margin:8px 0 0;">100% On-Brand</p>
                  </div>
                </div>

                <div style="border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);height:260px;">
                  <img src="/assets/quiet/hero-studio-craft.jpg" alt="Quiet Studio Interactive Creative OS" style="width:100%;height:100%;object-fit:cover;">
                </div>
              </div>
            </div>
          </div>
        </div>
        '''
        ter.append(BeautifulSoup(workspace_html, 'html.parser'))

    # 6. SELECTED WORK / SOFTWARE PORTFOLIO (#realisations)
    real = soup.find('section', id='realisations')
    if real:
        t = real.find('h2', id='t-realisations')
        if t:
            t.clear()
            t.append(BeautifulSoup('Software and systems built to <span class="baila">work</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = real.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">03</span>Selected Work', 'html.parser'))

        side = real.find('div', class_='head__side')
        if side:
            p = side.find('p', class_='head__i')
            if p:
                p.clear()
                p.append(BeautifulSoup('In-house tools, software products, and applied intelligence systems engineered and shipped by Quiet Studio.', 'html.parser'))

        projects = real.find_all('article', class_='case')
        software_list = [
            {
                'title': 'Capture Desktop',
                'tag': 'LOCAL-FIRST OS · ELECTRON & RUST',
                'desc': 'A distraction-free desktop operating workspace designed for cognitive flow, instant local file retrieval, and low-latency local model inference.',
                'tags': ['Local-First', 'Rust Runtime', 'Desktop OS'],
                'img': '/assets/quiet/fintech-identity.jpg'
            },
            {
                'title': 'Aethel Runtime',
                'tag': 'APPLIED AI · AGENT ORCHESTRATION',
                'desc': 'Context-aware multi-agent runtime with discreet authority boundaries, verifiable execution trees, and streaming telemetry dashboards.',
                'tags': ['Multi-Agent', 'Streaming Graph', 'TypeScript SDK'],
                'img': '/assets/quiet/project-atlas.jpg'
            },
            {
                'title': 'Resonance OS',
                'tag': 'STUDIO PLATFORM · ADAPTIVE LEARNING',
                'desc': 'Adaptive intelligence engine and cognitive training environment built for senior technical squads and researchers.',
                'tags': ['Cognitive UX', 'Edge Inference', 'Telemetry'],
                'img': '/assets/quiet/product-brand.jpg'
            },
            {
                'title': 'Zen AI Engine',
                'tag': 'CORE TECHNOLOGY · QUANTIZED INFERENCE',
                'desc': 'Quantized on-device AI runtime running fully private on Apple Silicon and modern WebGPU browsers with zero cloud dependency.',
                'tags': ['Apple Silicon', 'WebGPU', 'Quantized Models'],
                'img': '/assets/quiet/digital-editorial.jpg'
            },
            {
                'title': 'Titan Analytics',
                'tag': 'ENTERPRISE SYSTEM · HIGH-FREQUENCY DATA',
                'desc': 'Real-time financial telemetry dashboard with streaming WebSocket anomaly detection, custom canvas graphs, and millisecond latency.',
                'tags': ['Canvas 2D', 'WebSockets', 'Real-Time Telemetry'],
                'img': '/assets/quiet/startup-presentation.jpg'
            }
        ]

        for i, card in enumerate(projects[:5]):
            data = software_list[i]
            t_tag = card.find('h3', class_='case__t')
            if t_tag:
                a_tag = t_tag.find('a')
                if a_tag:
                    a_tag.string = data['title']
                    a_tag['href'] = '#realisations'
                else:
                    t_tag.string = data['title']

            k_tag = card.find('p', class_='case__k')
            if k_tag:
                k_tag.string = data['tag']

            d_tag = card.find('p', class_='case__d')
            if d_tag:
                d_tag.string = data['desc']

            ul = card.find('ul', class_='case__tags')
            if ul:
                ul.clear()
                for tag in data['tags']:
                    li = soup.new_tag('li')
                    li.string = tag
                    ul.append(li)

            img = card.find('img')
            if img:
                img['src'] = data['img']
                img['alt'] = data['title']
                if img.has_attr('srcset'): del img['srcset']
                if img.has_attr('data-src'): del img['data-src']
                if img.has_attr('data-srcset'): del img['data-srcset']

    # 7. SIMPLE, TRANSPARENT PRICING (Replacing #actualites)
    actu = soup.find('section', id='actualites')
    if actu:
        actu['id'] = 'pricing'
        actu['class'] = ['sec', 'papier', 'qs-pricing-sec']
        actu.clear()
        pricing_html = '''
        <div class="wrap" style="padding:100px 0 110px;max-width:1120px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:60px;">
            <h2 style="font:800 clamp(3.2rem,6vw,5.5rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#111111;margin-bottom:18px;">
              Simple, transparent pricing
            </h2>
            <p style="color:#71717a;font-size:clamp(1.1rem,1.8vw,1.35rem);font-weight:500;">
              Run it yourself, or have us run it for you.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;align-items:stretch;">
            <!-- Card 1: AI Agency ($290/mo) Dark Wine / Charcoal Card -->
            <div style="background:#260d14;border-radius:32px;padding:48px 40px;color:#ffffff;box-shadow:0 24px 60px rgba(0,0,0,0.15);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <h3 style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 12px;">AI Agency</h3>
                <p style="font-size:14.5px;color:rgba(255,255,255,0.75);line-height:1.5;margin:0 0 32px;">
                  A team of agents that run your ads, design workflows and content on Google, Meta, LinkedIn, Reddit and Twitter.
                </p>

                <div style="margin-bottom:32px;">
                  <span style="font:600 12px/1 'DM Mono',monospace;color:rgba(255,255,255,0.6);text-transform:uppercase;">Per brand, per month</span>
                  <div style="font:900 58px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:12px 0 8px;">
                    $290
                  </div>
                  <span style="font-size:13.5px;color:rgba(255,255,255,0.6);">billed monthly, or $190/mo with annual prepay</span>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;border-top:1px solid rgba(255,255,255,0.12);padding-top:28px;">
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ffffff;font-weight:bold;">✓</span>
                    <span>AI static and video creative, with $100 of creative compute included monthly</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ffffff;font-weight:bold;">✓</span>
                    <span>Claude Code and ChatGPT integration and MCP tools</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ffffff;font-weight:bold;">✓</span>
                    <span>Competitor research and ad library intelligence</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ffffff;font-weight:bold;">✓</span>
                    <span>Top creative performance telemetry reports</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ffffff;font-weight:bold;">✓</span>
                    <span>Slack Agent for team automated triggers</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ffffff;font-weight:bold;">✓</span>
                    <span>Unlimited team users and seats</span>
                  </div>
                </div>
              </div>

              <div style="margin-top:40px;">
                <a href="#contact" style="display:flex;align-items:center;justify-content:space-between;background:#ffffff;color:#18181b;font:800 15px/1 'Cabinet Grotesk',sans-serif;padding:16px 24px;border-radius:9999px;text-decoration:none;transition:transform 0.2s ease;">
                  <span>Get Started</span>
                  <span style="width:28px;height:28px;border-radius:50%;background:#18181b;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:14px;">→</span>
                </a>
              </div>
            </div>

            <!-- Card 2: Managed Service ($3,500/mo) White Card -->
            <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:32px;padding:48px 40px;color:#18181b;box-shadow:0 16px 48px rgba(0,0,0,0.06);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <h3 style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#18181b;margin:0 0 12px;">Managed service</h3>
                <p style="font-size:14.5px;color:#71717a;line-height:1.5;margin:0 0 32px;">
                  Your AI studio, plus dedicated senior human creative &amp; engineering directors to build and ship for you. The best of both worlds!
                </p>

                <div style="margin-bottom:32px;">
                  <span style="font:600 12px/1 'DM Mono',monospace;color:#71717a;text-transform:uppercase;">Starting at</span>
                  <div style="display:flex;align-items:baseline;gap:8px;">
                    <span style="font:900 58px/1 'Cabinet Grotesk',sans-serif;color:#18181b;margin:12px 0 8px;">$3,500</span>
                    <span style="font-size:16px;color:#71717a;font-weight:600;">/month</span>
                  </div>
                  <span style="font-size:13.5px;color:#71717a;">10% of ad/infra spend, with a $3,500 monthly minimum</span>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;border-top:1px solid #f4f4f5;padding-top:28px;">
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:#27272a;">
                    <span style="color:#0252ea;font-weight:bold;">✓</span>
                    <span>Everything from the AI Agency platform</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:#27272a;">
                    <span style="color:#0252ea;font-weight:bold;">✓</span>
                    <span>A dedicated expert director &amp; engineer manages your sprints and agents</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:#27272a;">
                    <span style="color:#0252ea;font-weight:bold;">✓</span>
                    <span>Direct Slack, email and phone syncs</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:#27272a;">
                    <span style="color:#0252ea;font-weight:bold;">✓</span>
                    <span>Weekly production releases and telemetry reports from your expert</span>
                  </div>
                </div>
              </div>

              <div style="margin-top:40px;">
                <a href="#contact" style="display:flex;align-items:center;justify-content:space-between;background:#18181b;color:#ffffff;font:800 15px/1 'Cabinet Grotesk',sans-serif;padding:16px 24px;border-radius:9999px;text-decoration:none;transition:transform 0.2s ease;">
                  <span>Discover the managed service</span>
                  <span style="width:28px;height:28px;border-radius:50%;background:#0252ea;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:14px;">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        '''
        actu.append(BeautifulSoup(pricing_html, 'html.parser'))

    # 8. QUIET STUDIO FAQ (#faq)
    faq = soup.find('section', id='faq')
    if faq:
        t = faq.find('h2', id='t-faq')
        if t:
            t.clear()
            t.append(BeautifulSoup('Clear answers to <span class="baila">common questions</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = faq.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">05</span>FAQ', 'html.parser'))

        side = faq.find('div', class_='head__side')
        if side:
            p = side.find('p', class_='head__i')
            if p:
                p.clear()
                p.append(BeautifulSoup('Everything you need to know about our sprints, software architectures, IP ownership, and pricing model.', 'html.parser'))

        qa_data = [
            (
                'How does Quiet Studio combine AI with human creative direction?',
                'We do not treat AI as a replacement for human taste or software architecture. Senior directors and engineers formulate product strategy, craft design systems, and review every line of code. AI agents handle repetitive synthesis, draft generation, and continuous telemetry testing—enabling us to ship production-grade products at 10x velocity.'
            ),
            (
                'What does "Managed creative services first, platform second" mean?',
                'It means you get working software and high-craft creative delivered by senior builders today. Rather than waiting for a theoretical SaaS tool, we run your sprints using our internal production operating system, which we are progressively making available to clients as self-service software.'
            ),
            (
                'What is the turnaround time for a design or product sprint?',
                'Our core sprints run in 48-hour to 2-week cycles. Initial design prototypes and functional PRDs are presented within 48 to 72 hours, with working software deployed to staging in structured bi-weekly milestones.'
            ),
            (
                'Do we own all intellectual property, source code, and design files?',
                'Yes, 100%. Upon settlement of project invoices, all intellectual property, Figma design files, token libraries, repository source code, and deployment configurations belong exclusively to your business.'
            ),
            (
                'How do we get started with Quiet Studio?',
                'Reach out via our contact modal or send a brief note to hello@thequietstudio.space. We schedule an initial 30-minute discovery session, interrogate technical constraints, and deliver an actionable scope within 48 hours.'
            ),
            (
                'What technologies and design tools do you work in?',
                'Our core design stack includes Figma, Tokens Studio, and custom React prototypes. Our software stack is built on Next.js 15, TypeScript, PostgreSQL, Tailwind CSS, Rust runtimes, and local ONNX/WebGPU inference pipelines.'
            ),
            (
                'How does pricing compare to a traditional agency or in-house hire?',
                'Traditional agencies charge high 5-figure retainers with massive account-management bloat. An in-house senior engineer and designer costs $300k+/year before benefits. Quiet Studio gives you dedicated senior talent and proprietary AI acceleration at transparent, flat-rate monthly pricing.'
            ),
            (
                'Can we transition from managed services to the self-service platform later?',
                'Absolutely. As we release self-service modules from our creative operating system, managed service partners receive priority access, pre-configured brand models, and dedicated migration tooling.'
            )
        ]

        details_list = faq.find_all('details')
        for i, (q_text, a_text) in enumerate(qa_data):
            if i < len(details_list):
                det = details_list[i]
                summ = det.find('summary')
                if summ:
                    summ.clear()
                    summ.append(q_text)
                    ico = soup.new_tag('span', **{'class': 'qa__ico', 'aria-hidden': 'true'})
                    summ.append(ico)
                
                ans_div = det.find('div', class_='qa__a')
                if ans_div:
                    ans_div.clear()
                    ans_p = soup.new_tag('p')
                    ans_p.string = a_text
                    ans_div.append(ans_p)

    # 9. CTA SECTION (.cta)
    cta = soup.find('section', class_='cta')
    if cta:
        cta['id'] = 'contact'
        h2 = cta.find('h2')
        if h2:
            h2.clear()
            h2.append(BeautifulSoup('Ideas into <span class="baila">intelligent products</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))
        p = cta.find('p', class_='cta__i')
        if p:
            p.string = 'Let’s turn your complex challenge into working software and unforgettable brand systems.'
        btn = cta.find('a', class_='btn')
        if btn:
            btn['href'] = '#contact'
            btn.clear()
            btn.append(BeautifulSoup('<span>Start a project</span><span aria-hidden="true" class="btn__arrow"><svg fill="none" viewbox="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"></path></svg></span>', 'html.parser'))
        direct = cta.find('p', class_='cta__direct')
        if direct:
            direct.clear()
            direct.append(BeautifulSoup('<a href="mailto:hello@thequietstudio.space" style="color:#ffffff;font-weight:600;text-decoration:none;">hello@thequietstudio.space</a>', 'html.parser'))

    # 10. FOOTER (.pied)
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
                Ideas into intelligent products. An independent AI-native product and creative studio combining human creative direction with intelligent workflows to build software that lasts.
              </p>
              <a href="#contact" class="cmd" style="background:#ff5a1f;color:#ffffff;border:none;border-radius:9999px;padding:12px 24px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
                <span>Start a project</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div style="display:flex;flex-wrap:wrap;gap:48px;">
              <div>
                <h4 style="color:#ff5a1f;font:700 12px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Studio</h4>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.95rem;">
                  <li><a href="#agence" style="color:rgba(255,255,255,0.85);text-decoration:none;">About</a></li>
                  <li><a href="#expertises" style="color:rgba(255,255,255,0.85);text-decoration:none;">Services</a></li>
                  <li><a href="#realisations" style="color:rgba(255,255,255,0.85);text-decoration:none;">Selected Work</a></li>
                  <li><a href="#workspace" style="color:rgba(255,255,255,0.85);text-decoration:none;">Creative OS</a></li>
                  <li><a href="#pricing" style="color:rgba(255,255,255,0.85);text-decoration:none;">Pricing</a></li>
                  <li><a href="#faq" style="color:rgba(255,255,255,0.85);text-decoration:none;">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 style="color:#ff5a1f;font:700 12px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Products Mode</h4>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.95rem;">
                  <li><a href="/#apps" style="color:rgba(255,255,255,0.85);text-decoration:none;">Open Core Apps</a></li>
                  <li><a href="/blog" style="color:rgba(255,255,255,0.85);text-decoration:none;">Blog &amp; Notes</a></li>
                  <li><a href="/#foundations" style="color:rgba(255,255,255,0.85);text-decoration:none;">Foundations</a></li>
                  <li><a href="/about" style="color:rgba(255,255,255,0.85);text-decoration:none;">About Quiet Studio</a></li>
                </ul>
              </div>

              <div>
                <h4 style="color:#ff5a1f;font:700 12px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Direct Contact</h4>
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
            <span>© 2026 Quiet Studio. All rights reserved.</span>
          </div>
        </div>
        '''
        pied.append(BeautifulSoup(footer_html, 'html.parser'))

    # Assemble complete HTML including main, cta and pied
    main = soup.find('main')
    main_html = str(main) if main else ''
    cta_html = str(cta) if cta else ''
    pied_html = str(pied) if pied else ''

    full_html = main_html + '\n' + cta_html + '\n' + pied_html

    # Strict token hygiene
    full_html = full_html.replace('Bitwip', 'Quiet Studio')
    full_html = full_html.replace('bitwip', 'quiet-studio')
    full_html = full_html.replace('Cayenne', 'San Francisco')
    full_html = full_html.replace('Martinique', 'New York')
    full_html = full_html.replace('Guadeloupe', 'London')
    full_html = full_html.replace('Réunion', 'Tokyo')
    full_html = full_html.replace('Occitanie', 'Bengaluru')
    full_html = full_html.replace('Overseas France', 'Worldwide')
    full_html = full_html.replace('French Guiana', 'San Francisco')

    json_escaped = json.dumps(full_html)
    ts_content = f'export const BITWIP_BODY_HTML = {json_escaped};\n'

    with open('client/src/components/bitwip-html.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print('Successfully generated complete stitched HTML! Total size:', len(ts_content))

if __name__ == '__main__':
    build_stitched_quiet_studio()
