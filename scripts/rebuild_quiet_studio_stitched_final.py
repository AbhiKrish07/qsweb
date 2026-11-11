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

    # Remove old nav and menus
    old_nav = soup.find('header', class_='nav')
    if old_nav:
        old_nav.decompose()

    old_menu = soup.find('div', id='menu')
    if old_menu:
        old_menu.decompose()

    # 1. HERO SECTION (#hh) — "WE [Square] BUILD BRANDS. ✱"
    # Matches user photo: "Creative work, reimagined." / "WE [Square] BUILD" / "BRANDS. ✱"
    hh = soup.find('section', id='hh')
    if hh:
        t = hh.find('h1', class_='hh__titre')
        if t:
            t.clear()
            sr = soup.new_tag('span', **{'class': 'sr-only'})
            sr.string = 'Quiet Studio | We build brands.'
            t.append(sr)

            lead = soup.new_tag('span', **{'class': 'mj__lead', 'aria-hidden': 'true'})
            lead.string = 'Creative work, reimagined.'
            t.append(lead)

            # Line 1: "WE [Square] BUILD"
            l1_html = '''<span class="mj__l1" aria-hidden="true">
              <span class="mj__m">
                <span class="mj__c" style="--r:0">W</span>
                <span class="mj__c" style="--r:1">E</span>
              </span>
              <span class="mj__trou"></span>
              <span class="mj__m">
                <span class="mj__c" style="--r:2">B</span>
                <span class="mj__c" style="--r:3">U</span>
                <span class="mj__c" style="--r:4">I</span>
                <span class="mj__c" style="--r:5">L</span>
                <span class="mj__c" style="--r:6">D</span>
              </span>
            </span>'''
            t.append(BeautifulSoup(l1_html, 'html.parser'))

            # Line 2: "BRANDS. ✱"
            l2_html = '''<span class="mj__l2" aria-hidden="true">
              <span class="mj__m">
                <span class="mj__c" style="--r:7">B</span>
                <span class="mj__c" style="--r:8">R</span>
                <span class="mj__c" style="--r:9">A</span>
                <span class="mj__c" style="--r:10">N</span>
                <span class="mj__c" style="--r:11">D</span>
                <span class="mj__c" style="--r:12">S</span>
                <span class="mj__c" style="--r:13">.</span>
              </span>
              <span class="etoile mj__etoile"></span>
            </span>'''
            t.append(BeautifulSoup(l2_html, 'html.parser'))

        # Ghost / Fantome Layer (.mj__fantome) — preserves .mj__pile, .hh__carte, .hh__reel and 6 plaques
        fantome = hh.find('div', class_='mj__fantome')
        if fantome:
            glead = fantome.find('div', class_='mj__lead')
            if glead: glead.string = 'Creative work, reimagined.'
            
            fl1 = fantome.find('div', class_='mj__l1')
            if fl1:
                pile = fl1.find('span', class_='mj__pile')
                fl1.clear()
                m1 = BeautifulSoup('<span aria-hidden="true" class="mj__m"><span class="mj__c" style="--r:0">W</span><span class="mj__c" style="--r:1">E</span></span>', 'html.parser')
                trou = soup.new_tag('span', **{'class': 'mj__trou'})
                if pile:
                    trou.append(pile)
                m2 = BeautifulSoup('<span aria-hidden="true" class="mj__m"><span class="mj__c" style="--r:2">B</span><span class="mj__c" style="--r:3">U</span><span class="mj__c" style="--r:4">I</span><span class="mj__c" style="--r:5">L</span><span class="mj__c" style="--r:6">D</span></span>', 'html.parser')
                fl1.append(m1)
                fl1.append(trou)
                fl1.append(m2)

            fl2 = fantome.find('div', class_='mj__l2')
            if fl2:
                fl2.clear()
                l2_ghost = BeautifulSoup('''<span aria-hidden="true" class="mj__m"><span class="mj__c" style="--r:7">B</span><span class="mj__c" style="--r:8">R</span><span class="mj__c" style="--r:9">A</span><span class="mj__c" style="--r:10">N</span><span class="mj__c" style="--r:11">D</span><span class="mj__c" style="--r:12">S</span><span class="mj__c" style="--r:13">.</span></span><span class="etoile mj__etoile"></span>''', 'html.parser')
                fl2.append(l2_ghost)

        # Curtain Layer (.mj__copie in .hh__rideau)
        copie = hh.find('div', class_='mj__copie')
        if copie:
            clead = copie.find('div', class_='mj__lead')
            if clead: clead.string = 'Creative work, reimagined.'
            cl1 = copie.find('div', class_='mj__l1')
            if cl1:
                cl1.clear()
                cl1.append(BeautifulSoup('''<span class="mj__m"><span class="mj__c" style="--r:0">W</span><span class="mj__c" style="--r:1">E</span></span> <span class="mj__trou"></span> <span class="mj__m"><span class="mj__c" style="--r:2">B</span><span class="mj__c" style="--r:3">U</span><span class="mj__c" style="--r:4">I</span><span class="mj__c" style="--r:5">L</span><span class="mj__c" style="--r:6">D</span></span>''', 'html.parser'))
            cl2 = copie.find('div', class_='mj__l2')
            if cl2:
                cl2.clear()
                cl2.append(BeautifulSoup('''<span class="mj__m"><span class="mj__c" style="--r:7">B</span><span class="mj__c" style="--r:8">R</span><span class="mj__c" style="--r:9">A</span><span class="mj__c" style="--r:10">N</span><span class="mj__c" style="--r:11">D</span><span class="mj__c" style="--r:12">S</span><span class="mj__c" style="--r:13">.</span></span><span class="etoile mj__etoile"></span>''', 'html.parser'))

        # Live Clocks matching user screenshot: San Francisco, New York, London, Paris, Tokyo
        clocks = hh.find('div', class_='clocks')
        if clocks:
            clocks['aria-label'] = 'Studio Local Times'
            clocks.clear()
            clocks_html = '''
            <a class="clock" href="#agence"><span class="clock__city">San Francisco</span><span class="clock__time c-time" data-tz="America/Los_Angeles" style="color:#ff5a1f;">--:--</span><span class="sr-only">, San Francisco Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">New York</span><span class="clock__time c-time" data-tz="America/New_York" style="color:#ff5a1f;">--:--</span><span class="sr-only">, New York Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">London</span><span class="clock__time c-time" data-tz="Europe/London" style="color:#ff5a1f;">--:--</span><span class="sr-only">, London Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">Paris</span><span class="clock__time c-time" data-tz="Europe/Paris" style="color:#ff5a1f;">--:--</span><span class="sr-only">, Paris Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">Tokyo</span><span class="clock__time c-time" data-tz="Asia/Tokyo" style="color:#ff5a1f;">--:--</span><span class="sr-only">, Tokyo Time</span></a>
            '''
            clocks.append(BeautifulSoup(clocks_html, 'html.parser'))

        # Manifest paragraph
        manif = hh.find('p', class_='hh__manif')
        if manif:
            manif.clear()
            manif_html = '''<span class="hh__phr" data-mots="">
              <span class="hh__w">We</span>
              <span class="hh__w">combine</span>
              <span class="hh__w">human</span>
              <span class="hh__w"><span class="baila">creative direction</span></span>
              <span class="hh__w">with</span>
              <span class="hh__w">intelligent</span>
              <span class="hh__w"><span class="baila">AI workflows</span></span>
              <span class="hh__w">to</span>
              <span class="hh__w">build</span>
              <span class="hh__w">brands</span>
              <span class="hh__w">that</span>
              <span class="hh__w"><span class="baila">endure</span>.</span>
            </span>'''
            manif.append(BeautifulSoup(manif_html, 'html.parser'))

    # 2. ABOUT THE STUDIO (#agence) — Deep Black & Signal Orange Colorway (removed papier!)
    ag = soup.find('section', id='agence')
    if ag:
        ag['class'] = ['sec', 'qs-dark-section']
        t = ag.find('h2', id='t-agence')
        if t:
            t.clear()
            t.append(BeautifulSoup('Good products begin with <span class="baila" style="color:#ff5a1f;">good questions</span>.<span aria-hidden="true" class="etoile" style="background:#ff5a1f;"></span>', 'html.parser'))

        k = ag.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n" style="color:#ff5a1f;">01</span>About the Studio', 'html.parser'))

        sensee = ag.find('div', class_='sensee')
        if sensee:
            sensee.clear()
            sensee_html = '''
            <div class="sensee__txt" data-reveal="">
              <p class="sensee__lead" style="color:#ffffff;font-size:clamp(1.25rem,2vw,1.65rem);font-weight:600;line-height:1.55;margin-bottom:24px;">
                Quiet Studio is an independent creative studio focused on branding, design and writing. We combine human creative direction with intelligent AI-assisted workflows to make thoughtful creative work more accessible, consistent and efficient.
              </p>
              <p class="sensee__p" style="color:rgba(255,255,255,0.78);font-size:1.05rem;line-height:1.7;margin-bottom:28px;">
                The three disciplines are the business. AI is how the studio works; it is not a fourth service. We build memorable brand systems, intuitive digital experiences, and sharp product narratives with obsessive craft and zero ceremony.
              </p>
              <a class="lnk sensee__btn" href="#expertises" style="color:#ffffff;font-weight:600;display:inline-flex;align-items:center;gap:8px;">
                <span>Explore our services</span>
                <svg fill="none" viewbox="0 0 16 16" width="16" height="16" aria-hidden="true" style="color:#ff5a1f;"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"></path></svg>
              </a>
            </div>

            <dl class="sensee__chiffres" data-counts="" data-reveal="" style="--d:.1s">
              <div class="sc" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;">
                <dt class="sr-only">Brand Disciplines</dt>
                <dd>
                  <span class="sc__n" style="color:#ff5a1f;"><span aria-hidden="true" class="sc__plus">0</span><span data-count="3">3</span></span>
                  <span aria-hidden="true" class="sc__l label" style="color:rgba(255,255,255,0.6);">Core Disciplines</span>
                </dd>
              </div>
              <div class="sc" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;">
                <dt class="sr-only">Sprint Turnaround</dt>
                <dd>
                  <span class="sc__n" style="color:#ff5a1f;"><span data-count="48">48</span><span aria-hidden="true" class="sc__plus">h</span></span>
                  <span aria-hidden="true" class="sc__l label" style="color:rgba(255,255,255,0.6);">Sprint Delivery</span>
                </dd>
              </div>
              <div class="sc" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;">
                <dt class="sr-only">IP Ownership</dt>
                <dd>
                  <span class="sc__n" style="color:#ff5a1f;"><span data-count="100">100</span><span aria-hidden="true" class="sc__plus">%</span></span>
                  <span aria-hidden="true" class="sc__l label" style="color:rgba(255,255,255,0.6);">Client IP Owned</span>
                </dd>
              </div>
              <div class="sc" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px;">
                <dt class="sr-only">Agency Overhead</dt>
                <dd>
                  <span class="sc__n" style="color:#ff5a1f;"><span aria-hidden="true" class="sc__plus">0</span><span data-count="0">0</span><span aria-hidden="true" class="sc__plus">%</span></span>
                  <span aria-hidden="true" class="sc__l label" style="color:rgba(255,255,255,0.6);">Bloat &amp; Meetings</span>
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
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,90,31,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/hero-studio-craft.jpg" alt="Quiet Studio Design System &amp; Brand Tokens" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,90,31,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/fintech-identity.jpg" alt="Kinetic Typography &amp; Identity Guidelines" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,90,31,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/project-atlas.jpg" alt="Autonomous Production Operating Workspace" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,90,31,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/product-brand.jpg" alt="Living Brand Guidelines &amp; Color Architectures" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:800/450;flex:0 0 380px;height:240px;border-radius:20px;overflow:hidden;border:1px solid rgba(255,90,31,0.25);box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/digital-editorial.jpg" alt="Editorial Narrative &amp; Manifesto Systems" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
                </li>
              </ul>
            </div>
            '''
            ag_vie.append(BeautifulSoup(gallery_html, 'html.parser'))

    # 3. OUR SERVICES ACCORDION (#expertises) — Black & Signal Orange
    exp = soup.find('section', id='expertises')
    if exp:
        exp.clear()
        services_section_html = '''
        <div class="wrap" style="padding:100px 0 120px;">
          <header class="head" style="margin-bottom:60px;">
            <p class="head__k label" style="color:#ff5a1f;font:700 12px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;"><span class="head__n" style="color:#ff5a1f;">02</span>Services</p>
            <h2 class="head__t" id="t-services" style="font-family:'Epure Titres',serif,sans-serif;font-size:clamp(3.5rem,7vw,6.5rem);font-weight:400;letter-spacing:-0.03em;color:#ffffff;display:flex;align-items:center;gap:12px;">
              Our services<span style="font-family:'Cabinet Grotesk',sans-serif;color:#ffffff;">.</span>
              <span aria-hidden="true" class="etoile" style="display:inline-block;width:32px;height:32px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
            </h2>
          </header>

          <div class="quiet-services-accordion" style="display:flex;flex-direction:column;gap:0;border-top:1px solid rgba(255,255,255,0.12);">
            <!-- Item 1: Brand Strategy & Identity (Open by default) -->
            <details class="qs-service-row" open style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">Brand Strategy &amp; Identity Architecture</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:#ff5a1f;display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:24px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;display:none;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  Visual World &amp; Wordmark Engineering /<br>
                  Custom Typography &amp; Grotesque Scales /<br>
                  Design Systems &amp; Living Token Libraries /<br>
                  Brand Guidelines, Artifacts &amp; Asset Packs /<br>
                  Autonomous Brand Compliance Workflows
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;transition:color 0.2s ease;">
                  <span>Give your brand an unforgettable visual identity</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>

            <!-- Item 2: Product & Interface Design -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/fleur.svg);mask-image:url(/assets/img/formes/fleur.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">Product &amp; Interface Design</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:22px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;display:none;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  UX/UI &amp; Component Architecture /<br>
                  Interaction Physics &amp; Micro-interactions /<br>
                  Tactile Audio Feedback &amp; Button Sounds /<br>
                  Figma to React Production Tokens /<br>
                  High-Conversion Landing Experience
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                  <span>Turn interface design into a tactile physical experience</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/fleur.svg);mask-image:url(/assets/img/formes/fleur.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>

            <!-- Item 3: System Copywriting & Narrative -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/trefle.svg);mask-image:url(/assets/img/formes/trefle.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">System Copywriting &amp; Narrative</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:22px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;display:none;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  Anti-Slop Manifesto &amp; Positioning Copy /<br>
                  Headlines, Deck Narratives &amp; Voice Guidelines /<br>
                  Product Microcopy &amp; Error Messaging Architecture /<br>
                  Technical Documentation &amp; Research Briefs /<br>
                  Multi-Channel Brand Tone Alignment
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                  <span>Write honest, high-impact prose that converts</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/trefle.svg);mask-image:url(/assets/img/formes/trefle.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>

            <!-- Item 4: Autonomous Creative Production -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;transition:all 0.3s ease;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;outline:none;user-select:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;flex-shrink:0;"></span>
                  <h3 style="font:600 clamp(1.6rem,2.8vw,2.5rem)/1.2 'Space Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">Autonomous Creative Production &amp; Agents</h3>
                </div>
                <div class="qs-acc-toggle" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:22px;font-weight:400;flex-shrink:0;">
                  <span class="qs-icon-minus" style="line-height:1;margin-top:-2px;display:none;">−</span>
                  <span class="qs-icon-plus" style="line-height:1;margin-top:-1px;">+</span>
                </div>
              </summary>
              <div class="qs-service-content" style="padding:28px 0 10px 44px;max-width:850px;">
                <p style="color:rgba(255,255,255,0.9);font-size:clamp(1.1rem,1.8vw,1.45rem);line-height:1.65;font-weight:400;margin-bottom:28px;">
                  Multi-Agent Creative Generation Swarms /<br>
                  MCP &amp; Claude Code Workspace Automation /<br>
                  Automated Ad Variation &amp; Fatigue Telemetry /<br>
                  Brand Guardrails &amp; Continuous QA /<br>
                  High-Velocity Managed Execution
                </p>
                <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                  <span>Deploy autonomous pipelines that scale your creative output</span>
                  <span>→</span>
                  <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                </a>
              </div>
            </details>
          </div>
        </div>
        '''
        exp.append(BeautifulSoup(services_section_html, 'html.parser'))

    # 4. BEFORE & AFTER QUIET STUDIO — Black & Signal Orange Colorway
    conf = soup.find('section', id='confiance')
    if conf:
        conf['class'] = ['sec', 'qs-before-after-sec']
        conf.clear()
        before_after_html = '''
        <div class="wrap" style="padding:100px 0 110px;max-width:1120px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:50px;">
            <h2 style="font:800 clamp(3.2rem,6vw,5.5rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#ffffff;margin-bottom:24px;">
              Before &amp; after Quiet Studio
            </h2>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:9999px;background:rgba(255,90,31,0.15);color:#ff5a1f;border:1px solid rgba(255,90,31,0.3);font:700 11px/1 'DM Mono',monospace;letter-spacing:0.06em;text-transform:uppercase;">
              REFRESHING TIRED CREATIVE &amp; WORKFLOWS
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;align-items:stretch;margin-bottom:32px;">
            <!-- Left Card: Before Quiet Studio -->
            <div style="background:#141413;border:1px solid rgba(255,255,255,0.1);border-radius:28px;padding:44px 38px;box-shadow:0 12px 36px rgba(0,0,0,0.4);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <h3 style="font:800 28px/1.1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 6px;">Before Quiet Studio</h3>
                <p style="font-size:15px;color:rgba(255,255,255,0.6);margin:0 0 36px;font-weight:500;">The old agency way</p>

                <div style="display:flex;flex-direction:column;gap:24px;border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.8);font:600 12px/1 'DM Mono',monospace;text-align:center;">1 hour</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Spot the fatigue</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.65);line-height:1.5;margin:0;">Comb through fragmented designs to find what is slipping.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.8);font:600 12px/1 'DM Mono',monospace;text-align:center;">2 hours</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Make replacements</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.65);line-height:1.5;margin:0;">Brief and design fresh variations manually from scratch.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.8);font:600 12px/1 'DM Mono',monospace;text-align:center;">30 min</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Swap them in</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.65);line-height:1.5;margin:0;">Pause outdated assets and manually deploy new ones.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:28px;margin-top:36px;display:flex;justify-content:space-between;align-items:baseline;">
                <span style="font:800 18px/1 'Cabinet Grotesk',sans-serif;letter-spacing:0.04em;text-transform:uppercase;color:rgba(255,255,255,0.6);">TOTAL TIME</span>
                <span style="font:800 28px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;">3.5 hours</span>
              </div>
            </div>

            <!-- Right Card: After Quiet Studio (Black & Orange) -->
            <div style="background:#18181b;border:1px solid #ff5a1f;border-radius:28px;padding:44px 38px;color:#ffffff;box-shadow:0 24px 60px rgba(255,90,31,0.2);display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
              <div style="position:absolute;top:28px;right:28px;width:72px;height:72px;border-radius:50%;background:rgba(255,90,31,0.15);border:1px solid #ff5a1f;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(255,90,31,0.3);">
                <span style="font:900 18px/1 'Space Grotesk',sans-serif;color:#ff5a1f;letter-spacing:-0.05em;">QS✦</span>
              </div>

              <div>
                <h3 style="font:800 28px/1.1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 6px;">After Quiet Studio</h3>
                <p style="font-size:15px;color:#ff5a1f;margin:0 0 36px;font-weight:600;">The new AI-native studio way</p>

                <div style="display:flex;flex-direction:column;gap:24px;border-top:1px solid rgba(255,90,31,0.25);padding-top:24px;">
                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:700 12px/1 'DM Mono',monospace;text-align:center;">Automatic</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Spot the fatigue</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.8);line-height:1.5;margin:0;">Top Creatives telemetry flags degradation before performance slips.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:700 12px/1 'DM Mono',monospace;text-align:center;">1 minute</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Generate replacements</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.8);line-height:1.5;margin:0;">Fresh on-brand variations generated with agent workflows.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:700 12px/1 'DM Mono',monospace;text-align:center;">Automatic</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Space Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Swap them in</h4>
                      <p style="font-size:13.5px;color:rgba(255,255,255,0.8);line-height:1.5;margin:0;">Tired assets retired, verified production creative rotated in.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style="border-top:1px solid rgba(255,90,31,0.25);padding-top:28px;margin-top:36px;display:flex;justify-content:space-between;align-items:baseline;">
                <span style="font:800 18px/1 'Cabinet Grotesk',sans-serif;letter-spacing:0.04em;text-transform:uppercase;color:#ff5a1f;">TOTAL TIME</span>
                <span style="font:800 28px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;">~1 minute</span>
              </div>
            </div>
          </div>

          <div style="background:#141413;border:1px solid rgba(255,90,31,0.3);color:#ffffff;border-radius:20px;padding:22px 32px;text-align:center;font:600 clamp(1.1rem,1.8vw,1.4rem)/1.4 'Space Grotesk',sans-serif;box-shadow:0 16px 40px rgba(0,0,0,0.5);">
            3.5 hours of creative refresh becomes <span style="color:#ff5a1f;">a glance and a click</span>.
          </div>
        </div>
        '''
        conf.append(BeautifulSoup(before_after_html, 'html.parser'))

    # 5. INTERACTIVE APP WORKSPACE (#workspace) — Black & Signal Orange
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

          <div class="qs-mockup-container" style="position:relative;background:#18181b;border:1px solid rgba(255,90,31,0.3);border-radius:28px;padding:32px;box-shadow:0 36px 80px rgba(0,0,0,0.7);margin:0 auto;">
            <div style="position:absolute;top:-18px;left:40px;background:#ff5a1f;color:#ffffff;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(-4deg);box-shadow:0 8px 20px rgba(255,90,31,0.4);letter-spacing:0.04em;z-index:10;">
              AD ROTATION ⚡
            </div>
            <div style="position:absolute;top:-18px;right:60px;background:#ffffff;color:#18181b;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(5deg);box-shadow:0 8px 20px rgba(255,255,255,0.3);letter-spacing:0.04em;z-index:10;">
              BULK UPLOAD ☁
            </div>
            <div style="position:absolute;bottom:40px;left:-20px;background:#ff5a1f;color:#ffffff;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(-8deg);box-shadow:0 8px 20px rgba(255,90,31,0.4);letter-spacing:0.04em;z-index:10;">
              TOP CREATIVES ✦
            </div>
            <div style="position:absolute;bottom:40px;right:-20px;background:#ffffff;color:#18181b;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(6deg);box-shadow:0 8px 20px rgba(255,255,255,0.3);letter-spacing:0.04em;z-index:10;">
              BRAND KITS ✦
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:18px;margin-bottom:24px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="width:12px;height:12px;border-radius:50%;background:#ff5a1f;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,0.4);display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,0.2);display:inline-block;"></span>
                <span style="margin-left:14px;font:700 13px 'DM Mono',monospace;color:rgba(255,255,255,0.7);">app.thequietstudio.space / workspace</span>
              </div>
              <div style="display:flex;gap:12px;">
                <span style="padding:4px 10px;border-radius:6px;background:rgba(255,90,31,0.15);border:1px solid rgba(255,90,31,0.3);font:600 11px 'DM Mono',monospace;color:#ff5a1f;">CONNECTED · 5 AGENTS ACTIVE</span>
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
                    <p style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ff5a1f;margin:8px 0 0;">1,420+ Assets</p>
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

    # 6. REPLACING BROKEN #realisations (PROJECTS) WITH INTERACTIVE KINETIC BRAND LAB!
    # "remove the projects thing and dont leave any place just black or blank but make it actually have something or make it some type of animation"
    real = soup.find('section', id='realisations')
    if real:
        real.clear()
        real['id'] = 'realisations'
        real['class'] = ['sec', 'qs-kinetic-lab-sec']
        kinetic_lab_html = '''
        <div class="wrap" style="padding:100px 0 120px;max-width:1200px;margin:0 auto;text-align:center;">
          <div style="margin-bottom:50px;">
            <span class="label" style="color:#ff5a1f;font:700 12px/1 'DM Mono',monospace;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px;display:inline-block;">03 / KINETIC SYSTEMS &amp; INTERACTIVE CRAFT</span>
            <h2 id="t-brand-lab" style="font:800 clamp(3.2rem,6.5vw,5.8rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#ffffff;margin:0 0 20px;">
              Living brand physics<span style="color:#ff5a1f;">.</span>
              <span aria-hidden="true" class="etoile" style="display:inline-block;width:32px;height:32px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
            </h2>
            <p style="color:rgba(255,255,255,0.75);font-size:clamp(1.1rem,1.8vw,1.4rem);max-width:680px;margin:0 auto;line-height:1.6;">
              Every system we design is built to move. Autonomous agent pipelines meet obsessive human typography, motion physics, and token-engineered design systems.
            </p>
          </div>

          <!-- Dual Infinite Kinetic Tickers running in opposite directions -->
          <div class="qs-ticker-container" style="overflow:hidden;padding:22px 0;border-top:1px solid rgba(255,90,31,0.25);border-bottom:1px solid rgba(255,90,31,0.25);margin-bottom:50px;background:rgba(255,90,31,0.03);">
            <!-- Ticker Row 1 (Leftward) -->
            <div class="qs-ticker-row qs-ticker-left" style="display:flex;gap:40px;white-space:nowrap;margin-bottom:14px;">
              <span class="qs-ticker-item">✦ LIVING BRAND SYSTEMS</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ AUTONOMOUS AGENT PIPELINES</span>
              <span class="qs-ticker-item">✦ ZERO CEREMONY</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ HIGH-VELOCITY SPRINTS</span>
              <span class="qs-ticker-item">✦ 0MS INTERACTION LATENCY</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ HIGH-CRAFT TYPOGRAPHY</span>
              <span class="qs-ticker-item">✦ LIVING BRAND SYSTEMS</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ AUTONOMOUS AGENT PIPELINES</span>
              <span class="qs-ticker-item">✦ ZERO CEREMONY</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ HIGH-VELOCITY SPRINTS</span>
              <span class="qs-ticker-item">✦ 0MS INTERACTION LATENCY</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ HIGH-CRAFT TYPOGRAPHY</span>
            </div>
            <!-- Ticker Row 2 (Rightward) -->
            <div class="qs-ticker-row qs-ticker-right" style="display:flex;gap:40px;white-space:nowrap;">
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ PIXEL-PERFECT CRAFT</span>
              <span class="qs-ticker-item">✦ DETERMINISTIC WORKFLOWS</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ FIGMA TO PRODUCTION</span>
              <span class="qs-ticker-item">✦ PROPRIETARY DESIGN TOKENS</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ EVIDENCE OVER CLAIMS</span>
              <span class="qs-ticker-item">✦ TACTILE MICRO-INTERACTIONS</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ PIXEL-PERFECT CRAFT</span>
              <span class="qs-ticker-item">✦ DETERMINISTIC WORKFLOWS</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ FIGMA TO PRODUCTION</span>
              <span class="qs-ticker-item">✦ PROPRIETARY DESIGN TOKENS</span>
              <span class="qs-ticker-item" style="color:#ff5a1f;">✱ EVIDENCE OVER CLAIMS</span>
              <span class="qs-ticker-item">✦ TACTILE MICRO-INTERACTIONS</span>
            </div>
          </div>

          <!-- Interactive 3D Brand Physics Console -->
          <div class="qs-interactive-console" style="background:linear-gradient(180deg, #18181b 0%, #121214 100%);border:1px solid rgba(255,90,31,0.3);border-radius:28px;padding:44px 36px;box-shadow:0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1);position:relative;overflow:hidden;">
            <div style="position:absolute;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(rgba(255,90,31,0.12) 1px, transparent 1px);background-size:28px 28px;opacity:0.5;pointer-events:none;"></div>

            <div style="position:relative;z-index:2;">
              <!-- Interactive Clickable Chips -->
              <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:36px;">
                <button type="button" class="qs-interactive-chip is-active">
                  <span class="qs-chip-dot"></span>
                  <span>✦ BRAND ARCHITECTURE</span>
                </button>
                <button type="button" class="qs-interactive-chip">
                  <span class="qs-chip-dot"></span>
                  <span>✱ KINETIC TYPOGRAPHY</span>
                </button>
                <button type="button" class="qs-interactive-chip">
                  <span class="qs-chip-dot"></span>
                  <span>⚡ AUTONOMOUS WORKFLOWS</span>
                </button>
                <button type="button" class="qs-interactive-chip">
                  <span class="qs-chip-dot"></span>
                  <span>⌘ LIVING DESIGN TOKENS</span>
                </button>
                <button type="button" class="qs-interactive-chip">
                  <span class="qs-chip-dot"></span>
                  <span>◉ 0ms INTERACTION LATENCY</span>
                </button>
              </div>

              <!-- 3D Stage -->
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:32px;align-items:center;text-align:left;">
                <!-- Left: 3D Rotating Cube -->
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 20px;background:rgba(0,0,0,0.5);border-radius:20px;border:1px solid rgba(255,90,31,0.2);min-height:280px;">
                  <div class="qs-kinetic-cube-wrap">
                    <div class="qs-kinetic-cube">
                      <div class="qs-cube-face qs-face-front">QUIET</div>
                      <div class="qs-cube-face qs-face-back">STUDIO</div>
                      <div class="qs-cube-face qs-face-right">CRAFT</div>
                      <div class="qs-cube-face qs-face-left">BRANDS</div>
                      <div class="qs-cube-face qs-face-top">✦</div>
                      <div class="qs-cube-face qs-face-bottom">✱</div>
                    </div>
                  </div>
                  <span style="font:700 11px/1 'DM Mono',monospace;color:#ff5a1f;margin-top:24px;letter-spacing:0.08em;text-transform:uppercase;">INTERACTIVE 3D KINETIC CORE</span>
                </div>

                <!-- Right: Telemetry & Waveform Animation -->
                <div style="display:flex;flex-direction:column;justify-content:space-between;height:100%;padding:28px;background:rgba(0,0,0,0.5);border-radius:20px;border:1px solid rgba(255,90,31,0.2);">
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:12px;">
                      <span style="font:700 12px 'DM Mono',monospace;color:#ff5a1f;">LIVE SYSTEM TELEMETRY</span>
                      <span style="font:600 11px 'DM Mono',monospace;color:#22c55e;">● 60 FPS MOTION ACTIVE</span>
                    </div>
                    <h4 style="font:800 24px/1.2 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 10px;">
                      Autonomous Brand Engine
                    </h4>
                    <p style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;margin:0 0 24px;">
                      High-fidelity design tokens, font metrics, and interaction physics synchronizing across Figma and production codebases in real time.
                    </p>
                  </div>

                  <!-- Waveform bars -->
                  <div>
                    <div style="display:flex;align-items:flex-end;gap:5px;height:48px;margin-bottom:14px;">
                      <div class="qs-wave-bar" style="--h:60%;--d:0.1s;"></div>
                      <div class="qs-wave-bar" style="--h:85%;--d:0.25s;"></div>
                      <div class="qs-wave-bar" style="--h:40%;--d:0.4s;"></div>
                      <div class="qs-wave-bar" style="--h:95%;--d:0.15s;"></div>
                      <div class="qs-wave-bar" style="--h:70%;--d:0.3s;"></div>
                      <div class="qs-wave-bar" style="--h:100%;--d:0.05s;"></div>
                      <div class="qs-wave-bar" style="--h:50%;--d:0.35s;"></div>
                      <div class="qs-wave-bar" style="--h:90%;--d:0.2s;"></div>
                      <div class="qs-wave-bar" style="--h:65%;--d:0.45s;"></div>
                      <div class="qs-wave-bar" style="--h:80%;--d:0.18s;"></div>
                      <div class="qs-wave-bar" style="--h:45%;--d:0.32s;"></div>
                      <div class="qs-wave-bar" style="--h:92%;--d:0.12s;"></div>
                      <div class="qs-wave-bar" style="--h:75%;--d:0.28s;"></div>
                      <div class="qs-wave-bar" style="--h:100%;--d:0.08s;"></div>
                      <div class="qs-wave-bar" style="--h:58%;--d:0.38s;"></div>
                      <div class="qs-wave-bar" style="--h:88%;--d:0.22s;"></div>
                    </div>
                    <div style="display:flex;justify-content:space-between;font:600 11px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">
                      <span>FREQUENCY: 44.1 kHz</span>
                      <span>PHYSICS: cubic-bezier(0.16, 1, 0.3, 1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        '''
        real.append(BeautifulSoup(kinetic_lab_html, 'html.parser'))

    # 7. SIMPLE, TRANSPARENT PRICING (#pricing) — Black & Signal Orange (removed papier!)
    actu = soup.find('section', id='actualites')
    if actu:
        actu['id'] = 'pricing'
        actu['class'] = ['sec', 'qs-pricing-sec']
        actu.clear()
        pricing_html = '''
        <div class="wrap" style="padding:100px 0 110px;max-width:1120px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:60px;">
            <p class="head__k label" style="color:#ff5a1f;font:700 12px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;"><span class="head__n" style="color:#ff5a1f;">04</span>Pricing</p>
            <h2 style="font:800 clamp(3.2rem,6vw,5.5rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#ffffff;margin-bottom:18px;">
              Simple, transparent pricing
            </h2>
            <p style="color:rgba(255,255,255,0.7);font-size:clamp(1.1rem,1.8vw,1.35rem);font-weight:500;">
              Run it yourself, or have us run it for you.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;align-items:stretch;">
            <!-- Card 1: AI Agency ($290/mo) Carbon Black -->
            <div style="background:#141413;border:1px solid rgba(255,255,255,0.12);border-radius:32px;padding:48px 40px;color:#ffffff;box-shadow:0 24px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <h3 style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 12px;">AI Agency</h3>
                <p style="font-size:14.5px;color:rgba(255,255,255,0.75);line-height:1.5;margin:0 0 32px;">
                  A team of agents that run your ads, design workflows and brand content on Google, Meta, LinkedIn, Reddit and Twitter.
                </p>

                <div style="margin-bottom:32px;">
                  <span style="font:600 12px/1 'DM Mono',monospace;color:rgba(255,255,255,0.6);text-transform:uppercase;">Per brand, per month</span>
                  <div style="font:900 58px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:12px 0 8px;">
                    $290
                  </div>
                  <span style="font-size:13.5px;color:rgba(255,255,255,0.6);">billed monthly, or $190/mo with annual prepay</span>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;border-top:1px solid rgba(255,255,255,0.1);padding-top:28px;">
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>AI static and video creative, with $100 of creative compute included monthly</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Claude Code and ChatGPT integration and MCP tools</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Competitor research and ad library intelligence</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Top creative performance telemetry reports</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Slack Agent for team automated triggers</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Unlimited team users and seats</span>
                  </div>
                </div>
              </div>

              <div style="margin-top:40px;">
                <a href="#contact" style="display:flex;align-items:center;justify-content:space-between;background:#ffffff;color:#18181b;font:800 15px/1 'Cabinet Grotesk',sans-serif;padding:16px 24px;border-radius:9999px;text-decoration:none;transition:transform 0.2s ease;">
                  <span>Get Started</span>
                  <span style="width:28px;height:28px;border-radius:50%;background:#ff5a1f;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:14px;">→</span>
                </a>
              </div>
            </div>

            <!-- Card 2: Managed Service ($3,500/mo) Dark Charcoal with Signal Orange border -->
            <div style="background:#18181b;border:1px solid #ff5a1f;border-radius:32px;padding:48px 40px;color:#ffffff;box-shadow:0 24px 60px rgba(255,90,31,0.18);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <h3 style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 12px;">Managed service</h3>
                <p style="font-size:14.5px;color:rgba(255,255,255,0.75);line-height:1.5;margin:0 0 32px;">
                  Your AI studio, plus dedicated senior human creative &amp; engineering directors to build and ship for you. The best of both worlds!
                </p>

                <div style="margin-bottom:32px;">
                  <span style="font:600 12px/1 'DM Mono',monospace;color:#ff5a1f;text-transform:uppercase;">Starting at</span>
                  <div style="display:flex;align-items:baseline;gap:8px;">
                    <span style="font:900 58px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:12px 0 8px;">$3,500</span>
                    <span style="font-size:16px;color:rgba(255,255,255,0.6);font-weight:600;">/month</span>
                  </div>
                  <span style="font-size:13.5px;color:rgba(255,255,255,0.6);">10% of spend, with a $3,500 monthly minimum</span>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;border-top:1px solid rgba(255,90,31,0.25);padding-top:28px;">
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Everything from the AI Agency platform</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>A dedicated expert director &amp; engineer manages your sprints and agents</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Direct Slack, email and phone syncs</span>
                  </div>
                  <div style="display:flex;align-items:start;gap:12px;font-size:14px;color:rgba(255,255,255,0.9);">
                    <span style="color:#ff5a1f;font-weight:bold;">✓</span>
                    <span>Weekly production releases and telemetry reports from your expert</span>
                  </div>
                </div>
              </div>

              <div style="margin-top:40px;">
                <a href="#contact" style="display:flex;align-items:center;justify-content:space-between;background:#ff5a1f;color:#ffffff;font:800 15px/1 'Cabinet Grotesk',sans-serif;padding:16px 24px;border-radius:9999px;text-decoration:none;box-shadow:0 6px 24px rgba(255,90,31,0.4);transition:transform 0.2s ease;">
                  <span>Discover the managed service</span>
                  <span style="width:28px;height:28px;border-radius:50%;background:#ffffff;color:#18181b;display:flex;align-items:center;justify-content:center;font-size:14px;">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        '''
        actu.append(BeautifulSoup(pricing_html, 'html.parser'))

    # 8. QUIET STUDIO FAQ (#faq) — Black & Signal Orange
    faq = soup.find('section', id='faq')
    if faq:
        faq['class'] = ['sec', 'qs-dark-section']
        t = faq.find('h2', id='t-faq')
        if t:
            t.clear()
            t.append(BeautifulSoup('Clear answers to <span class="baila" style="color:#ff5a1f;">common questions</span>.<span aria-hidden="true" class="etoile" style="background:#ff5a1f;"></span>', 'html.parser'))

        k = faq.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n" style="color:#ff5a1f;">05</span>FAQ', 'html.parser'))

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
                    ico = soup.new_tag('span', **{'class': 'qa__ico', 'aria-hidden': 'true', 'style': 'color:#ff5a1f;'})
                    summ.append(ico)
                
                ans_div = det.find('div', class_='qa__a')
                if ans_div:
                    ans_div.clear()
                    ans_p = soup.new_tag('p', **{'style': 'color:rgba(255,255,255,0.85);line-height:1.65;'})
                    ans_p.string = a_text
                    ans_div.append(ans_p)

    # 9. CTA SECTION (.cta)
    cta = soup.find('section', class_='cta')
    if cta:
        cta['id'] = 'contact'
        h2 = cta.find('h2')
        if h2:
            h2.clear()
            h2.append(BeautifulSoup('We build <span class="baila" style="color:#ff5a1f;">brands</span>.<span aria-hidden="true" class="etoile" style="background:#ff5a1f;"></span>', 'html.parser'))
        p = cta.find('p', class_='cta__i')
        if p:
            p.string = 'Let’s turn your vision into an enduring brand system and working software.'
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
                Creative work, reimagined. An independent AI-native studio combining human creative direction with intelligent workflows to build enduring brands.
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
                  <li><a href="#realisations" style="color:rgba(255,255,255,0.85);text-decoration:none;">Kinetic Lab</a></li>
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
                  <li><span style="color:rgba(255,255,255,0.5);">San Francisco · New York · Paris · London · Tokyo</span></li>
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

    # Assemble complete HTML
    main = soup.find('main')
    main_html = str(main) if main else ''
    cta_html = str(cta) if cta else ''
    pied_html = str(pied) if pied else ''

    full_html = main_html + '\n' + cta_html + '\n' + pied_html

    # Purge any remaining unwanted tokens
    full_html = full_html.replace('Bitwip', 'Quiet Studio')
    full_html = full_html.replace('bitwip', 'quiet-studio')
    full_html = full_html.replace('PAEI Guyane', 'Quiet Studio Identity')
    full_html = full_html.replace('GDI One Guiana', 'Aethel Core Platform')
    full_html = full_html.replace('Pièces Auto Web', 'Titan Systems')
    full_html = full_html.replace('Overseas France', 'Worldwide')
    full_html = full_html.replace('French Guiana', 'San Francisco')
    full_html = full_html.replace('Cayenne', 'San Francisco')
    full_html = full_html.replace('Martinique', 'New York')
    full_html = full_html.replace('Guadeloupe', 'London')
    full_html = full_html.replace('Réunion', 'Paris')
    full_html = full_html.replace('Occitanie', 'Tokyo')

    json_escaped = json.dumps(full_html)
    ts_content = f'export const BITWIP_BODY_HTML = {json_escaped};\n'

    with open('client/src/components/bitwip-html.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print('Successfully generated complete stitched HTML! Total size:', len(ts_content))

if __name__ == '__main__':
    build_stitched_quiet_studio()
