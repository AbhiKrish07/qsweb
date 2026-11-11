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

    # Remove old nav, menus, and skip link
    old_nav = soup.find('header', class_='nav')
    if old_nav:
        old_nav.decompose()

    old_menu = soup.find('div', id='menu')
    if old_menu:
        old_menu.decompose()

    old_skip = soup.find('a', class_='skip')
    if old_skip:
        old_skip.decompose()

    # 1. HERO SECTION (#hh) — "WE [Square Reel] BUILD BRANDS. ✱"
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

        # Update Video Reel to use uploaded MP4
        reel = hh.find('video', class_='hh__reel')
        if reel:
            reel['aria-label'] = 'Quiet Studio: Ideas into intelligent products'
            reel['poster'] = '/assets/quiet/craft-software-code.jpg'
            reel.clear()
            reel.append(BeautifulSoup('<source src="/assets/video/quiet-studio-launch.mp4" type="video/mp4"/>', 'html.parser'))

        # Live Clocks: San Francisco, New York, London, Paris, Tokyo
        clocks = hh.find('div', class_='clocks')
        if clocks:
            clocks['aria-label'] = 'Studio Local Times'
            clocks.clear()
            clocks_html = '''
            <a class="clock" href="#agence"><span class="clock__city">San Francisco</span><span class="clock__time c-time" data-tz="America/Los_Angeles">--:--</span><span class="sr-only">, San Francisco Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">New York</span><span class="clock__time c-time" data-tz="America/New_York">--:--</span><span class="sr-only">, New York Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">London</span><span class="clock__time c-time" data-tz="Europe/London">--:--</span><span class="sr-only">, London Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">Paris</span><span class="clock__time c-time" data-tz="Europe/Paris">--:--</span><span class="sr-only">, Paris Time</span></a>
            <a class="clock" href="#agence"><span class="clock__city">Tokyo</span><span class="clock__time c-time" data-tz="Asia/Tokyo">--:--</span><span class="sr-only">, Tokyo Time</span></a>
            '''
            clocks.append(BeautifulSoup(clocks_html, 'html.parser'))

        # Manifest paragraph
        manif = hh.find('p', class_='hh__manif')
        if manif:
            manif.clear()
            manif_html = '''<span class="hh__phr" data-mots="">
              <span class="hh__w">Quiet Studio</span>
              <span class="hh__w">turns</span>
              <span class="hh__w">ideas</span>
              <span class="hh__w">into</span>
              <span class="hh__w"><span class="baila">intelligent products</span>.</span>
              <span class="hh__w">Independent</span>
              <span class="hh__w">product</span>
              <span class="hh__w">and</span>
              <span class="hh__w"><span class="baila">AI studio</span></span>
              <span class="hh__w">for</span>
              <span class="hh__w">founders</span>
              <span class="hh__w">and</span>
              <span class="hh__w">teams</span>
              <span class="hh__w">building</span>
              <span class="hh__w">the</span>
              <span class="hh__w"><span class="baila">future</span>.</span>
            </span>'''
            manif.append(BeautifulSoup(manif_html, 'html.parser'))

    # 2. ABOUT THE STUDIO (#agence) — Warm Paper Background (#faf9f5)
    ag = soup.find('section', id='agence')
    if ag:
        ag['class'] = ['sec', 'papier']
        ag['data-jonction'] = 'feuille'
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
              <p class="sensee__lead">
                Quiet Studio is an independent creative studio focused on branding, design and writing. We combine human creative direction with intelligent AI-assisted workflows to make thoughtful creative work more accessible, consistent and efficient.
              </p>
              <p class="sensee__p">
                The three disciplines are the business. AI is how the studio works; it is not a fourth service. We build memorable brand systems, intuitive digital experiences, and sharp product narratives with obsessive craft and zero ceremony.
              </p>
              <a class="lnk sensee__btn" href="#expertises">
                <span>Explore our services</span>
                <svg fill="none" viewbox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"></path></svg>
              </a>
            </div>

            <dl class="sensee__chiffres" data-counts="" data-reveal="" style="--d:.1s">
              <div class="sc">
                <dt class="sr-only">Brand Disciplines</dt>
                <dd>
                  <span class="sc__n"><span aria-hidden="true" class="sc__plus">0</span><span data-count="3">3</span></span>
                  <span aria-hidden="true" class="sc__l label">Core Disciplines</span>
                </dd>
              </div>
              <div class="sc">
                <dt class="sr-only">Sprint Turnaround</dt>
                <dd>
                  <span class="sc__n"><span data-count="48">48</span><span aria-hidden="true" class="sc__plus">h</span></span>
                  <span aria-hidden="true" class="sc__l label">Sprint Delivery</span>
                </dd>
              </div>
              <div class="sc">
                <dt class="sr-only">IP Ownership</dt>
                <dd>
                  <span class="sc__n"><span data-count="100">100</span><span aria-hidden="true" class="sc__plus">%</span></span>
                  <span aria-hidden="true" class="sc__l label">Client IP Owned</span>
                </dd>
              </div>
              <div class="sc">
                <dt class="sr-only">Agency Overhead</dt>
                <dd>
                  <span class="sc__n"><span aria-hidden="true" class="sc__plus">0</span><span data-count="0">0</span><span aria-hidden="true" class="sc__plus">%</span></span>
                  <span aria-hidden="true" class="sc__l label">Bloat &amp; Meetings</span>
                </dd>
              </div>
            </dl>
            '''
            sensee.append(BeautifulSoup(sensee_html, 'html.parser'))

        ag_vie = ag.find('div', class_='ag-vie')
        if ag_vie:
            ag_vie.clear()
            gallery_html = '''
            <div class="ag-vie__bande" role="group">
              <ul class="ag-vie__piste">
                <li class="ag-vie__ph" style="--ar:16/9">
                  <img src="/assets/quiet/craft-design-system.jpg" alt="Quiet Studio Design System & Component Architecture" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:16/9">
                  <img src="/assets/quiet/craft-software-code.jpg" alt="Quiet Studio High-Velocity Software Engineering" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:16/9">
                  <img src="/assets/quiet/craft-ai-agents.jpg" alt="Quiet Studio Applied AI Agent Architecture" loading="lazy">
                </li>
                <li class="ag-vie__ph" style="--ar:16/9">
                  <img src="/assets/quiet/craft-brand-system.jpg" alt="Quiet Studio Brand Identity & Guidelines" loading="lazy">
                </li>
              </ul>
            </div>
            '''
            ag_vie.append(BeautifulSoup(gallery_html, 'html.parser'))

    # 3. OUR SERVICES ACCORDION (#expertises) — Dark Section (#141413)
    exp = soup.find('section', id='expertises')
    if exp:
        exp.clear()
        exp['class'] = ['sec']
        services_section_html = '''
        <div class="wrap" style="padding:60px 0 24px;">
          <header class="head" style="margin-bottom:60px;">
            <p class="head__k label" style="color:#ff5a1f;font:700 12px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;"><span class="head__n" style="color:#ff5a1f;">02</span>Services</p>
            <h2 class="head__t" id="t-services" style="font-family:'Epure Titres',serif,sans-serif;font-size:clamp(3.5rem,7vw,6.5rem);font-weight:400;letter-spacing:-0.03em;color:#ffffff;display:flex;align-items:center;gap:12px;">
              Our services<span style="font-family:'Cabinet Grotesk',sans-serif;color:#ffffff;">.</span>
              <span aria-hidden="true" class="etoile" style="display:inline-block;width:32px;height:32px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
            </h2>
          </header>

          <div class="quiet-services-accordion" style="display:flex;flex-direction:column;gap:0;border-top:1px solid rgba(255,255,255,0.12);">
            <!-- Item 1: Product Design & Systems (Open by default) -->
            <details class="qs-service-row" open style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="width:20px;height:20px;background:#a3e635;display:inline-block;-webkit-mask-image:url(/assets/img/formes/soleil.svg);mask-image:url(/assets/img/formes/soleil.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  <h3 style="font:700 clamp(1.8rem,3.2vw,2.75rem)/1.15 'Cabinet Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">
                    Product Design &amp; Systems
                  </h3>
                </div>
                <div class="qs-accordion-icon" style="width:36px;height:36px;border-radius:50%;background:#ff5a1f;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;line-height:1;">
                  <span class="icon-open">−</span>
                  <span class="icon-closed">+</span>
                </div>
              </summary>
              <div class="qs-service-body" style="display:flex;align-items:center;justify-content:space-between;gap:36px;padding:28px 0 16px 40px;flex-wrap:wrap;">
                <div style="flex:1 1 480px;max-width:640px;">
                  <p style="color:rgba(255,255,255,0.85);font-size:clamp(1.05rem,1.7vw,1.3rem);line-height:1.75;margin-bottom:28px;">
                    UX/UI &amp; Interface Architecture /<br>
                    Design Systems &amp; Token Libraries /<br>
                    Interaction Physics &amp; Micro-interactions /<br>
                    Tactile Click &amp; Audio Feedback /<br>
                    Interactive Figma &amp; React Prototypes
                  </p>
                  <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                    <span>Give your design &amp; software engineering a clear structure</span>
                    <span>→</span>
                    <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  </a>
                </div>
                <div class="qs-service-media-card" style="flex:0 0 380px;max-width:100%;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);background:#09090b;box-shadow:0 16px 36px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/service-design-system.jpg" alt="Product Design & Systems Preview" style="width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;display:block;" loading="lazy">
                </div>
              </div>
            </details>

            <!-- Item 2: Full-Stack Software Engineering -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="width:20px;height:20px;background:#f472b6;display:inline-block;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  <h3 style="font:700 clamp(1.8rem,3.2vw,2.75rem)/1.15 'Cabinet Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">
                    Full-Stack Software Engineering
                  </h3>
                </div>
                <div class="qs-accordion-icon" style="width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.25);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;line-height:1;">
                  <span class="icon-open">−</span>
                  <span class="icon-closed">+</span>
                </div>
              </summary>
              <div class="qs-service-body" style="display:flex;align-items:center;justify-content:space-between;gap:36px;padding:28px 0 16px 40px;flex-wrap:wrap;">
                <div style="flex:1 1 480px;max-width:640px;">
                  <p style="color:rgba(255,255,255,0.85);font-size:clamp(1.05rem,1.7vw,1.3rem);line-height:1.75;margin-bottom:28px;">
                    High-Performance Web &amp; Mobile Applications /<br>
                    Next.js, React, Node.js, TypeScript &amp; Rust /<br>
                    Cloud &amp; Local-First Architecture /<br>
                    API Integrations, Real-Time Sync &amp; Database Design /<br>
                    Production Infrastructure &amp; CI/CD Pipelines
                  </p>
                  <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                    <span>Ship production software that scales with your ambition</span>
                    <span>→</span>
                    <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  </a>
                </div>
                <div class="qs-service-media-card" style="flex:0 0 380px;max-width:100%;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);background:#09090b;box-shadow:0 16px 36px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/service-fullstack-code.jpg" alt="Full-Stack Software Engineering Preview" style="width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;display:block;" loading="lazy">
                </div>
              </div>
            </details>

            <!-- Item 3: Applied AI & Intelligent Systems -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="width:20px;height:20px;background:#4ade80;display:inline-block;-webkit-mask-image:url(/assets/img/formes/trefle.svg);mask-image:url(/assets/img/formes/trefle.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  <h3 style="font:700 clamp(1.8rem,3.2vw,2.75rem)/1.15 'Cabinet Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">
                    Applied AI &amp; Intelligent Systems
                  </h3>
                </div>
                <div class="qs-accordion-icon" style="width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.25);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;line-height:1;">
                  <span class="icon-open">−</span>
                  <span class="icon-closed">+</span>
                </div>
              </summary>
              <div class="qs-service-body" style="display:flex;align-items:center;justify-content:space-between;gap:36px;padding:28px 0 16px 40px;flex-wrap:wrap;">
                <div style="flex:1 1 480px;max-width:640px;">
                  <p style="color:rgba(255,255,255,0.85);font-size:clamp(1.05rem,1.7vw,1.3rem);line-height:1.75;margin-bottom:28px;">
                    Custom Agentic Workflows &amp; Multi-Agent Swarms /<br>
                    LLM Fine-Tuning &amp; Local On-Device Models (Apple Silicon/NPU) /<br>
                    Retrieval-Augmented Generation (RAG) &amp; Semantic Search /<br>
                    Intelligent Automation Pipelines &amp; Workspaces /<br>
                    Autonomous Research, Synthesis &amp; Code Synthesis
                  </p>
                  <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                    <span>Turn complex AI capabilities into simple, useful software</span>
                    <span>→</span>
                    <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  </a>
                </div>
                <div class="qs-service-media-card" style="flex:0 0 380px;max-width:100%;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);background:#09090b;box-shadow:0 16px 36px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/service-ai-agent.jpg" alt="Applied AI & Intelligent Systems Preview" style="width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;display:block;" loading="lazy">
                </div>
              </div>
            </details>

            <!-- Item 4: Brand Identity & Product Narrative -->
            <details class="qs-service-row" style="border-bottom:1px solid rgba(255,255,255,0.12);padding:32px 0;">
              <summary style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;list-style:none;">
                <div style="display:flex;align-items:center;gap:20px;">
                  <span style="width:20px;height:20px;background:#c084fc;display:inline-block;-webkit-mask-image:url(/assets/img/formes/fleur.svg);mask-image:url(/assets/img/formes/fleur.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  <h3 style="font:700 clamp(1.8rem,3.2vw,2.75rem)/1.15 'Cabinet Grotesk',sans-serif;color:#ffffff;letter-spacing:-0.02em;margin:0;">
                    Brand Identity &amp; Product Narrative
                  </h3>
                </div>
                <div class="qs-accordion-icon" style="width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.25);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;line-height:1;">
                  <span class="icon-open">−</span>
                  <span class="icon-closed">+</span>
                </div>
              </summary>
              <div class="qs-service-body" style="display:flex;align-items:center;justify-content:space-between;gap:36px;padding:28px 0 16px 40px;flex-wrap:wrap;">
                <div style="flex:1 1 480px;max-width:640px;">
                  <p style="color:rgba(255,255,255,0.85);font-size:clamp(1.05rem,1.7vw,1.3rem);line-height:1.75;margin-bottom:28px;">
                    Brand Strategy &amp; Commercial Positioning /<br>
                    Kinetic Typography Systems &amp; Art Direction /<br>
                    Product Messaging, Technical Copywriting &amp; Studio Voice /<br>
                    Living Design Tokens &amp; Digital Style Guides /<br>
                    Launch Collateral, Keynotes &amp; Interactive Showcases
                  </p>
                  <a href="#contact" class="qs-service-cta" style="display:inline-flex;align-items:center;gap:10px;color:#ff5a1f;font-size:1.05rem;font-weight:600;text-decoration:underline;text-underline-offset:6px;">
                    <span>Build an enduring identity that cuts through the noise</span>
                    <span>→</span>
                    <span style="display:inline-block;width:16px;height:16px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/sceau.svg);mask-image:url(/assets/img/formes/sceau.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;"></span>
                  </a>
                </div>
                <div class="qs-service-media-card" style="flex:0 0 380px;max-width:100%;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);background:#09090b;box-shadow:0 16px 36px rgba(0,0,0,0.5);">
                  <img src="/assets/quiet/service-brand-guidelines.jpg" alt="Brand Identity & Product Narrative Preview" style="width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;display:block;" loading="lazy">
                </div>
              </div>
            </details>
          </div>
        </div>
        '''
        exp.append(BeautifulSoup(services_section_html, 'html.parser'))

    # 4. SELECTED WORK & PRODUCTS (#realisations)
    real = soup.find('section', id='realisations')
    if real:
        real.clear()
        real['class'] = ['sec', 'noir-suite', 'piste']
        real['id'] = 'realisations'
        real['data-piste'] = ''
        real['aria-labelledby'] = 't-cases'
        work_html = '''
        <div class="piste__scene" data-piste-scene>
          <header class="piste__intro" style="margin-bottom:32px;padding-top:16px;">
            <div class="piste__haut">
              <p class="head__k label" style="color:#ff5a1f;font:700 12px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;"><span class="head__n" style="color:#ff5a1f;">03</span>Work</p>
              <h2 class="head__t piste__t" id="t-cases" style="font-family:'Epure Titres',serif,sans-serif;font-size:clamp(2.8rem,5.5vw,5rem);font-weight:400;letter-spacing:-0.03em;color:#ffffff;line-height:1.08;max-width:16ch;opacity:1 !important;transform:none !important;">
                Conceived, designed and <span class="baila" style="font-family:'Baila',Georgia,serif;font-style:italic;color:#ff5a1f;">engineered</span>.<span class="etoile" aria-hidden="true" style="display:inline-block;width:28px;height:28px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;vertical-align:middle;margin-left:8px;"></span>
              </h2>
            </div>
            <div class="piste__bas" style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:16px;">
              <p class="piste__i" style="color:rgba(255,255,255,0.7);font-size:clamp(1.05rem,1.4vw,1.25rem);max-width:540px;line-height:1.6;margin:0;">
                Quiet Studio's active products, open-source runtimes, and living brand architectures.
              </p>
              <a class="lnk" href="/#apps" style="color:#ff5a1f;font-weight:600;display:inline-flex;align-items:center;gap:8px;text-decoration:none;">
                <span>Explore all products</span>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" style="width:14px;height:14px;"><path d="M1 8h13M9 3l5 5-5 5" stroke="#ff5a1f" stroke-width="1.6"/></svg>
              </a>
            </div>
          </header>

          <div class="piste__rail" data-piste-rail>
            <div class="piste__cartes">

              <!-- Case 1: Zen AI (Flagship Local AI Engine) -->
              <article class="qr" data-metier="web">
                <p class="qr__client">
                  <span class="label">Flagship Runtime</span>
                  <span class="tag">Open Core</span>
                  <span class="tag tag--metier"><span class="forme forme--etoile-huit forme--citron" aria-hidden="true"></span>Rust / C++</span>
                </p>
                <div class="qr__media">
                  <img src="/assets/quiet/craft-software-code.jpg" alt="Zen AI Runtime Architecture" width="1440" height="1050" loading="lazy">
                </div>
                <div class="qr__corps">
                  <h3 class="qr__q"><a class="qr__lien" href="/products/zen-ai" data-verbe="Explore runtime">Zen AI</a></h3>
                  <div class="qr__r">
                    <p class="qr__rl label">Core Architecture</p>
                    <p class="qr__rt">A serene, local-first open source AI engine running on-device neural quantizations with 0.2ms latency and zero telemetry.</p>
                  </div>
                  <span class="qr__go lnk" aria-hidden="true">Explore Zen AI<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
                </div>
              </article>

              <!-- Case 2: LearnLoop (Adaptive Learning Platform) -->
              <article class="qr" data-metier="direction">
                <p class="qr__client">
                  <span class="label">Flagship App</span>
                  <span class="tag">Cognitive Systems</span>
                  <span class="tag tag--metier"><span class="forme forme--fleur forme--papaye" aria-hidden="true"></span>Adaptive AI</span>
                </p>
                <div class="qr__media">
                  <img src="/assets/quiet/craft-ai-agents.jpg" alt="LearnLoop Cognitive AI Agent Flow" width="1440" height="1280" loading="lazy">
                </div>
                <div class="qr__corps">
                  <h3 class="qr__q"><a class="qr__lien" href="/products/learnloop" data-verbe="View product">LearnLoop</a></h3>
                  <div class="qr__r">
                    <p class="qr__rl label">Core Architecture</p>
                    <p class="qr__rt">A frictionless loop for turning curiosity into durable understanding with tight feedback loops and adaptive recall.</p>
                  </div>
                  <span class="qr__go lnk" aria-hidden="true">Explore LearnLoop<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
                </div>
              </article>

              <!-- Case 3: Performance Metric Card (.qr-chiffre) -->
              <article class="qr-chiffre" data-metier="activation">
                <div class="qr-chiffre__haut">
                  <p class="qr-chiffre__client">Local-First Edge Execution</p>
                  <p class="qr-chiffre__tags"><span class="qr-chiffre__canal"><span class="forme forme--trefle forme--vert" aria-hidden="true"></span>Neural Latency</span><span class="tag">Apple Silicon</span></p>
                </div>
                <div class="qr-chiffre__milieu">
                  <p class="qr-chiffre__n" data-counts><span data-count="0.2" data-decimals="1">0.2</span><span class="qr-chiffre__s">&#8239;ms</span></p>
                  <p class="qr-chiffre__u">local inference latency with zero cloud dependency</p>
                </div>
                <div class="qr-chiffre__pied">
                  <p class="qr-chiffre__t">Zero API subscriptions, zero latency, zero telemetry. High-velocity computing directly on Apple Silicon &amp; edge NPUs.</p>
                  <a class="lnk qr-chiffre__lien" href="/#foundations" data-verbe="Read architecture">Read technical architecture<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></a>
                </div>
              </article>

              <!-- Case 4: Aethel Runtime (Autonomous Production Pipelines) -->
              <article class="qr" data-metier="conseil">
                <p class="qr__client">
                  <span class="label">AI Lab</span>
                  <span class="tag">Autonomous Swarms</span>
                  <span class="tag tag--metier"><span class="forme forme--sceau forme--lavande" aria-hidden="true"></span>Living Tokens</span>
                </p>
                <div class="qr__media">
                  <img src="/assets/quiet/craft-design-system.jpg" alt="Aethel Design Systems & Token Engine" width="1600" height="1152" loading="lazy">
                </div>
                <div class="qr__corps">
                  <h3 class="qr__q"><a class="qr__lien" href="/products/aethel" data-verbe="Explore research">Aethel Runtime</a></h3>
                  <div class="qr__r">
                    <p class="qr__rl label">Core Architecture</p>
                    <p class="qr__rt">Context-engineered multi-agent pipelines generating production-ready creative variations and ad assets with strict brand guardrails.</p>
                  </div>
                  <span class="qr__go lnk" aria-hidden="true">Explore Aethel<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
                </div>
              </article>

              <!-- Case 5: Capture Desktop (macOS Screen Context & Intent) -->
              <article class="qr" data-metier="web">
                <p class="qr__client">
                  <span class="label">macOS Native</span>
                  <span class="tag">Local Storage</span>
                  <span class="tag tag--metier"><span class="forme forme--etoile-huit forme--citron" aria-hidden="true"></span>Zero Cloud</span>
                </p>
                <div class="qr__media">
                  <img src="/assets/quiet/craft-brand-system.jpg" alt="Capture Desktop macOS Assistant" width="1600" height="1200" loading="lazy">
                </div>
                <div class="qr__corps">
                  <h3 class="qr__q"><a class="qr__lien" href="/products/capture" data-verbe="View app">Capture Desktop</a></h3>
                  <div class="qr__r">
                    <p class="qr__rl label">Core Architecture</p>
                    <p class="qr__rt">Ambient screen context and intent capture built for creative directors and software engineers who build fast.</p>
                  </div>
                  <span class="qr__go lnk" aria-hidden="true">Explore Capture<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
                </div>
              </article>

              <!-- Case 6: TrendCulture (Culture & Signal Radar) -->
              <article class="qr" data-metier="direction">
                <p class="qr__client">
                  <span class="label">Research Concept</span>
                  <span class="tag">Signal Engine</span>
                  <span class="tag tag--metier"><span class="forme forme--fleur forme--papaye" aria-hidden="true"></span>Trend Telemetry</span>
                </p>
                <div class="qr__media">
                  <img src="/assets/quiet/startup-presentation.jpg" alt="TrendCulture Signal Dashboard" width="1600" height="1200" loading="lazy">
                </div>
                <div class="qr__corps">
                  <h3 class="qr__q"><a class="qr__lien" href="/products/trendculture" data-verbe="View concept">TrendCulture</a></h3>
                  <div class="qr__r">
                    <p class="qr__rl label">Core Architecture</p>
                    <p class="qr__rt">A swipeable signal feed for understanding cultural shifts and emerging creative aesthetic movements.</p>
                  </div>
                  <span class="qr__go lnk" aria-hidden="true">Explore TrendCulture<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
                </div>
              </article>

              <div class="realfin">
                <ul class="realfin__ronds" aria-label="More active products">
                  <li><a class="realfin__rond" href="/products/driftboard"><img src="/assets/quiet/product-brand.jpg" alt="" width="800" height="583" loading="lazy"><span class="realfin__nom">Driftboard</span></a></li>
                  <li><a class="realfin__rond" href="/products/blitz-v5"><img src="/assets/quiet/hero-holum.jpg" alt="" width="800" height="478" loading="lazy"><span class="realfin__nom">Blitz V5</span></a></li>
                  <li><a class="realfin__rond" href="/products/signalhouse"><img src="/assets/quiet/hero-minimalist.jpg" alt="" width="800" height="800" loading="lazy"><span class="realfin__nom">Signalhouse</span></a></li>
                  <li><a class="realfin__rond" href="/products/codewell"><img src="/assets/quiet/fintech-identity.jpg" alt="" width="800" height="583" loading="lazy"><span class="realfin__nom">Codewell</span></a></li>
                </ul>
                <div class="realfin__appels">
                  <a class="realfin__tous" href="/#apps"><span>All products &amp; runtimes</span><span class="realfin__go" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span></a>
                  <a class="btn btn--ligne btn--sm realfin__contact" href="#contact">Build with Quiet Studio<span class="btn__arrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span></a>
                </div>
              </div>

              <a class="piste__fin" href="/#apps" tabindex="-1" aria-hidden="true">
                <span class="piste__fin-t">All products</span>
                <span class="piste__fin-go" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
              </a>

            </div>
          </div>
          <div class="piste__barre" aria-hidden="true"><i data-piste-barre></i></div>
        </div>
        '''
        real.append(BeautifulSoup(work_html, 'html.parser'))

    # 5. BEFORE & AFTER QUIET STUDIO (#confiance) — Warm Paper Background (#faf9f5)
    conf = soup.find('section', id='confiance')
    if conf:
        conf['class'] = ['sec', 'papier', 'qs-before-after-sec']
        conf['data-jonction'] = 'feuille'
        conf.clear()
        before_after_html = '''
        <div class="wrap" style="padding:100px 0 110px;max-width:1120px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:50px;">
            <h2 style="font:800 clamp(3.2rem,6vw,5.5rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#141413;margin-bottom:24px;">
              Before &amp; after Quiet Studio
            </h2>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:9999px;background:rgba(255,90,31,0.12);color:#ff5a1f;border:1px solid rgba(255,90,31,0.25);font:700 11px/1 'DM Mono',monospace;letter-spacing:0.06em;text-transform:uppercase;">
              REFRESHING TIRED CREATIVE &amp; WORKFLOWS
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:32px;align-items:stretch;margin-bottom:32px;">
            <!-- Left Card: Before Quiet Studio -->
            <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:28px;padding:44px 38px;box-shadow:0 8px 30px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <h3 style="font:800 28px/1.1 'Cabinet Grotesk',sans-serif;color:#141413;margin:0 0 6px;">Before Quiet Studio</h3>
                <p style="font-size:15px;color:#71717a;margin:0 0 36px;font-weight:500;">The old agency way</p>

                <div style="display:flex;flex-direction:column;gap:24px;border-top:1px solid rgba(0,0,0,0.06);padding-top:24px;">
                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(0,0,0,0.05);color:#141413;font:600 12px/1 'DM Mono',monospace;text-align:center;">1 hour</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Cabinet Grotesk',sans-serif;color:#141413;margin:0 0 4px;">Spot the fatigue</h4>
                      <p style="font-size:13.5px;color:#71717a;line-height:1.5;margin:0;">Comb through fragmented designs to find what is slipping.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(0,0,0,0.05);color:#141413;font:600 12px/1 'DM Mono',monospace;text-align:center;">2 hours</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Cabinet Grotesk',sans-serif;color:#141413;margin:0 0 4px;">Make replacements</h4>
                      <p style="font-size:13.5px;color:#71717a;line-height:1.5;margin:0;">Brief and design fresh variations manually from scratch.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:rgba(0,0,0,0.05);color:#141413;font:600 12px/1 'DM Mono',monospace;text-align:center;">30 min</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Cabinet Grotesk',sans-serif;color:#141413;margin:0 0 4px;">Swap them in</h4>
                      <p style="font-size:13.5px;color:#71717a;line-height:1.5;margin:0;">Pause outdated assets and manually deploy new ones.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style="border-top:1px solid rgba(0,0,0,0.06);padding-top:28px;margin-top:36px;display:flex;justify-content:space-between;align-items:baseline;">
                <span style="font:800 18px/1 'Cabinet Grotesk',sans-serif;letter-spacing:0.04em;text-transform:uppercase;color:#71717a;">TOTAL TIME</span>
                <span style="font:800 28px/1 'Cabinet Grotesk',sans-serif;color:#141413;">3.5 hours</span>
              </div>
            </div>

            <!-- Right Card: After Quiet Studio (Bold Charcoal & Orange) -->
            <div class="qs-dark-card" style="background:#141413;border:1px solid #ff5a1f;border-radius:28px;padding:44px 38px;color:#ffffff;box-shadow:0 20px 50px rgba(0,0,0,0.25);display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;">
              <div style="position:absolute;top:28px;right:28px;width:72px;height:72px;border-radius:50%;background:rgba(255,90,31,0.15);border:1px solid #ff5a1f;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(255,90,31,0.3);">
                <span style="font:900 18px/1 'Cabinet Grotesk',sans-serif;color:#ff5a1f;letter-spacing:-0.05em;">QS✦</span>
              </div>

              <div>
                <h3 style="font:800 28px/1.1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 6px;">After Quiet Studio</h3>
                <p class="qs-card-sub" style="font-size:15px;color:#ff5a1f !important;margin:0 0 36px;font-weight:700;">The new AI-native studio way</p>

                <div style="display:flex;flex-direction:column;gap:24px;border-top:1px solid rgba(255,90,31,0.25);padding-top:24px;">
                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:700 12px/1 'DM Mono',monospace;text-align:center;">Automatic</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Spot the fatigue</h4>
                      <p class="qs-card-desc" style="font-size:13.5px;color:#ffffff !important;line-height:1.5;margin:0;">Top Creatives telemetry flags degradation before performance slips.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:700 12px/1 'DM Mono',monospace;text-align:center;">1 minute</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Generate replacements</h4>
                      <p class="qs-card-desc" style="font-size:13.5px;color:#ffffff !important;line-height:1.5;margin:0;">Fresh on-brand variations generated with agent workflows.</p>
                    </div>
                  </div>

                  <div style="display:grid;grid-template-columns:85px 1fr;gap:16px;align-items:start;">
                    <span style="display:inline-block;padding:6px 10px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:700 12px/1 'DM Mono',monospace;text-align:center;">Automatic</span>
                    <div>
                      <h4 style="font:700 16px/1.3 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:0 0 4px;">Swap them in</h4>
                      <p class="qs-card-desc" style="font-size:13.5px;color:#ffffff !important;line-height:1.5;margin:0;">Tired ads retired, new creative rotated in automatically.</p>
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

          <!-- Bottom High-Contrast Insight Pill -->
          <div class="qs-dark-pill" style="background:#141413;border:1px solid rgba(255,90,31,0.4);border-radius:20px;padding:22px 32px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,0.25);">
            <p style="font:700 clamp(1.1rem,1.8vw,1.4rem)/1.4 'Cabinet Grotesk',sans-serif;color:#ffffff !important;margin:0;letter-spacing:-0.01em;">
              3.5 hours of creative refresh becomes <span style="color:#ff5a1f;font-weight:800;">a glance and a click.</span>
            </p>
          </div>
        </div>
        '''
        conf.append(BeautifulSoup(before_after_html, 'html.parser'))

        # 6. CENTRALIZED WORKSPACE MOCKUP (Replaces #territoires)
    ter = soup.find('section', id='territoires')
    if ter:
        ter['id'] = 'workspace'
        ter['class'] = ['sec', 'qs-workspace-sec']
        ter.clear()
        workspace_html = '''        <div class="wrap" style="padding:90px 0 110px;max-width:1160px;margin:0 auto;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:9999px;background:rgba(255,90,31,0.12);color:#ff5a1f;border:1px solid rgba(255,90,31,0.25);font:700 11px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">
            <span>CREATIVE OPERATING SYSTEM</span>
          </div>

          <h2 style="font:800 clamp(3.2rem,6vw,5.5rem)/1 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#ffffff;margin-bottom:18px;">
            Every brand's creative, in one place
          </h2>
          <p style="color:rgba(255,255,255,0.75);font-size:clamp(1.1rem,1.8vw,1.35rem);max-width:680px;margin:0 auto 46px;line-height:1.6;">
            The centralized operating system for creative production, software delivery, and live telemetry.
          </p>

          <div class="qs-mockup-container" style="position:relative;background:#18181b;border:1px solid rgba(255,90,31,0.3);border-radius:28px;padding:32px;box-shadow:0 36px 80px rgba(0,0,0,0.7);margin:0 auto;">
            <!-- Interactive Floating Badges -->
            <button type="button" class="qs-sticker qs-sticker-rotation" style="position:absolute;top:-18px;left:40px;background:#ff5a1f;color:#ffffff;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(-4deg);box-shadow:0 8px 20px rgba(255,90,31,0.4);letter-spacing:0.04em;z-index:10;border:none;cursor:pointer;">
              AD ROTATION
            </button>
            <button type="button" class="qs-sticker qs-sticker-bulk" style="position:absolute;top:-18px;right:60px;background:#ffffff;color:#18181b;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(5deg);box-shadow:0 8px 20px rgba(255,255,255,0.3);letter-spacing:0.04em;z-index:10;border:none;cursor:pointer;">
              BULK UPLOAD
            </button>
            <button type="button" class="qs-sticker qs-sticker-top" style="position:absolute;bottom:40px;left:-20px;background:#ff5a1f;color:#ffffff;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(-8deg);box-shadow:0 8px 20px rgba(255,90,31,0.4);letter-spacing:0.04em;z-index:10;border:none;cursor:pointer;">
              TOP CREATIVES
            </button>
            <button type="button" class="qs-sticker qs-sticker-brand" style="position:absolute;bottom:40px;right:-20px;background:#ffffff;color:#18181b;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:8px 14px;border-radius:8px;transform:rotate(6deg);box-shadow:0 8px 20px rgba(255,255,255,0.3);letter-spacing:0.04em;z-index:10;border:none;cursor:pointer;">
              BRAND KITS
            </button>

            <!-- Window Header Bar -->
            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:18px;margin-bottom:24px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="width:12px;height:12px;border-radius:50%;background:#ff5a1f;display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,0.4);display:inline-block;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,0.2);display:inline-block;"></span>
                <span style="margin-left:14px;font:700 13px 'DM Mono',monospace;color:rgba(255,255,255,0.7);">app.thequietstudio.space / workspace</span>
              </div>
              <div style="display:flex;gap:12px;">
                <span class="qs-agent-status-pill" style="padding:4px 12px;border-radius:9999px;background:rgba(255,90,31,0.15);border:1px solid rgba(255,90,31,0.3);font:700 11px 'DM Mono',monospace;color:#ff5a1f;display:flex;align-items:center;gap:6px;">
                  <span style="width:6px;height:6px;border-radius:50%;background:#ff5a1f;display:inline-block;animation:pulse 2s infinite;"></span>
                  CONNECTED · 5 AGENTS ACTIVE
                </span>
              </div>
            </div>

            <!-- Workspace Body: Sidebar + Main Canvas -->
            <div style="display:grid;grid-template-columns:230px 1fr;gap:24px;text-align:left;">
              <!-- Clean, High-Craft Navigation Sidebar (SVG Icons, Zero Extra Labels, Pure Spacing) -->
              <div class="qs-workspace-tabs" style="border-right:1px solid rgba(255,255,255,0.08);padding-right:16px;display:flex;flex-direction:column;gap:6px;">
                <button type="button" class="qs-ws-tab is-active" data-tab="campaigns">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 10 5-10 5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
                  <span>Active Sprints</span>
                </button>
                <button type="button" class="qs-ws-tab" data-tab="pipelines">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
                  <span>Agent Pipelines</span>
                </button>
                <button type="button" class="qs-ws-tab" data-tab="brandkits">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                  <span>Brand Tokens</span>
                </button>
                <button type="button" class="qs-ws-tab" data-tab="telemetry">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  <span>Live Telemetry</span>
                </button>
              </div>

              <!-- Interactive Dynamic Canvas -->
              <div class="qs-workspace-canvas">
                <!-- Top Key Metrics Cards -->
                <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-bottom:20px;">
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
                    <p style="font:800 24px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;margin:8px 0 0;">100% On-Brand</p>
                  </div>
                </div>

                <!-- Tab Pane 1: Active Sprints (Default) -->
                <div class="qs-tab-content is-active" id="pane-campaigns" style="border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);background:#121214;padding:20px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                    <span style="font:700 13px 'DM Mono',monospace;color:#ffffff;">SPRINT DEPLOYMENTS · REAL-TIME</span>
                    <span style="font:600 11px 'DM Mono',monospace;color:#ff5a1f;">UPDATED 2s AGO</span>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <span style="font:700 13px sans-serif;color:#fff;">Ad Variation Swarm v4</span>
                        <span style="font:600 10px 'DM Mono',monospace;color:#ff5a1f;">94%</span>
                      </div>
                      <div style="width:100%;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;margin-bottom:10px;">
                        <div style="width:94%;height:100%;background:#ff5a1f;"></div>
                      </div>
                      <p style="font-size:12px;color:rgba(255,255,255,0.6);margin:0;">12 live social & web variations generated and brand-verified.</p>
                    </div>
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <span style="font:700 13px sans-serif;color:#fff;">Design System Token Sync</span>
                        <span style="font:600 10px 'DM Mono',monospace;color:#10b981;">SYNCED</span>
                      </div>
                      <div style="width:100%;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;margin-bottom:10px;">
                        <div style="width:100%;height:100%;background:#10b981;"></div>
                      </div>
                      <p style="font-size:12px;color:rgba(255,255,255,0.6);margin:0;">Figma tokens translated into production Next.js code.</p>
                    </div>
                  </div>
                  <div style="margin-top:14px;border-radius:8px;overflow:hidden;height:120px;border:1px solid rgba(255,255,255,0.08);">
                    <img src="/assets/quiet/craft-software-code.jpg" alt="Active Sprints Overview" style="width:100%;height:100%;object-fit:cover;">
                  </div>
                </div>

                <!-- Tab Pane 2: Agent Pipelines -->
                <div class="qs-tab-content" id="pane-pipelines" style="display:none;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);background:#121214;padding:20px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                    <span style="font:700 13px 'DM Mono',monospace;color:#ffffff;">MULTI-AGENT AUTOMATION PIPELINE</span>
                    <span style="font:600 11px 'DM Mono',monospace;color:#10b981;">● RUNNING SMOOTHLY</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;overflow-x:auto;padding-bottom:12px;">
                    <div style="flex:1;background:rgba(255,90,31,0.1);border:1px solid #ff5a1f;border-radius:8px;padding:12px;text-align:center;">
                      <span style="font:700 11px 'DM Mono',monospace;color:#ff5a1f;">STEP 01</span>
                      <p style="font:700 12px sans-serif;color:#fff;margin:4px 0 0;">Product Brief</p>
                    </div>
                    <span style="color:#ff5a1f;display:inline-flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg></span>
                    <div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;text-align:center;">
                      <span style="font:700 11px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">STEP 02</span>
                      <p style="font:700 12px sans-serif;color:#fff;margin:4px 0 0;">AI Swarm</p>
                    </div>
                    <span style="color:rgba(255,255,255,0.35);display:inline-flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg></span>
                    <div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;text-align:center;">
                      <span style="font:700 11px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">STEP 03</span>
                      <p style="font:700 12px sans-serif;color:#fff;margin:4px 0 0;">Brand Check</p>
                    </div>
                    <span style="color:rgba(255,255,255,0.35);display:inline-flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg></span>
                    <div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;text-align:center;">
                      <span style="font:700 11px 'DM Mono',monospace;color:#10b981;">STEP 04</span>
                      <p style="font:700 12px sans-serif;color:#fff;margin:4px 0 0;">Deploy Code</p>
                    </div>
                  </div>
                  <div style="background:rgba(255,255,255,0.02);border:1px dashed rgba(255,255,255,0.1);border-radius:8px;padding:12px;font:500 12px 'DM Mono',monospace;color:rgba(255,255,255,0.7);">
                    Telemetry: 0 syntax errors · 100% test coverage · Latency 0.2ms edge execution
                  </div>
                </div>

                <!-- Tab Pane 3: Brand Tokens -->
                <div class="qs-tab-content" id="pane-brandkits" style="display:none;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);background:#121214;padding:20px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                    <span style="font:700 13px 'DM Mono',monospace;color:#ffffff;">LIVING DESIGN SYSTEM TOKENS</span>
                    <span style="font:600 11px 'DM Mono',monospace;color:#ff5a1f;">CLICK TO COPY</span>
                  </div>
                  <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;margin-bottom:14px;">
                    <div class="qs-token-swatch" data-hex="#ff5a1f" style="background:#ff5a1f;height:70px;border-radius:8px;padding:8px;display:flex;flex-direction:column;justify-content:flex-end;cursor:pointer;">
                      <span style="font:700 11px 'DM Mono',monospace;color:#fff;">#ff5a1f</span>
                      <span style="font:500 9px sans-serif;color:rgba(255,255,255,0.85);">Signal Orange</span>
                    </div>
                    <div class="qs-token-swatch" data-hex="#141413" style="background:#141413;border:1px solid rgba(255,255,255,0.2);height:70px;border-radius:8px;padding:8px;display:flex;flex-direction:column;justify-content:flex-end;cursor:pointer;">
                      <span style="font:700 11px 'DM Mono',monospace;color:#fff;">#141413</span>
                      <span style="font:500 9px sans-serif;color:rgba(255,255,255,0.6);">Charcoal Noir</span>
                    </div>
                    <div class="qs-token-swatch" data-hex="#faf9f5" style="background:#faf9f5;height:70px;border-radius:8px;padding:8px;display:flex;flex-direction:column;justify-content:flex-end;cursor:pointer;">
                      <span style="font:700 11px 'DM Mono',monospace;color:#141413;">#faf9f5</span>
                      <span style="font:500 9px sans-serif;color:rgba(20,20,19,0.7);">Warm Paper</span>
                    </div>
                    <div class="qs-token-swatch" data-hex="#71717a" style="background:#71717a;height:70px;border-radius:8px;padding:8px;display:flex;flex-direction:column;justify-content:flex-end;cursor:pointer;">
                      <span style="font:700 11px 'DM Mono',monospace;color:#fff;">#71717a</span>
                      <span style="font:500 9px sans-serif;color:rgba(255,255,255,0.85);">Muted Ink</span>
                    </div>
                  </div>
                  <div style="font:500 12px 'DM Mono',monospace;color:rgba(255,255,255,0.65);">
                    Typography: 'Cabinet Grotesk' (Display) · 'DM Sans' (Body) · 'DM Mono' (Telemetry)
                  </div>
                </div>

                <!-- Tab Pane 4: Live Telemetry -->
                <div class="qs-tab-content" id="pane-telemetry" style="display:none;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);background:#121214;padding:20px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                    <span style="font:700 13px 'DM Mono',monospace;color:#ffffff;">REAL-TIME SYSTEM DIAGNOSTIC</span>
                    <button type="button" class="qs-refresh-telemetry-btn" style="padding:5px 12px;border-radius:6px;background:rgba(255,90,31,0.15);border:1px solid #ff5a1f;color:#ff5a1f;font:700 11px 'DM Mono',monospace;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
                      <span>RUN SCAN</span>
                    </button>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">
                      <span style="font:600 10px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">AD FATIGUE</span>
                      <p style="font:800 20px/1 sans-serif;color:#10b981;margin:6px 0 2px;">12%</p>
                      <span style="font:500 10px sans-serif;color:rgba(255,255,255,0.6);">Optimal health</span>
                    </div>
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">
                      <span style="font:600 10px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">EDGE LATENCY</span>
                      <p style="font:800 20px/1 sans-serif;color:#ff5a1f;margin:6px 0 2px;">0.2 ms</p>
                      <span style="font:500 10px sans-serif;color:rgba(255,255,255,0.6);">Apple Silicon</span>
                    </div>
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;">
                      <span style="font:600 10px 'DM Mono',monospace;color:rgba(255,255,255,0.5);">CONSISTENCY</span>
                      <p style="font:800 20px/1 sans-serif;color:#ffffff;margin:6px 0 2px;">100%</p>
                      <span style="font:500 10px sans-serif;color:rgba(255,255,255,0.6);">Brand compliant</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>'''
        ter.append(BeautifulSoup(workspace_html, 'html.parser'))

    # 7. TRANSPARENT PRICING (#pricing - Replaces #actualites) — Warm Paper Background (#faf9f5)
    act = soup.find('section', id='actualites')
    if act:
        act['id'] = 'pricing'
        act['class'] = ['sec', 'papier', 'qs-pricing-sec']
        act['data-jonction'] = 'feuille'
        act.clear()
        pricing_html = '''
        <div class="wrap" style="padding:100px 0 120px;max-width:1160px;margin:0 auto;">
          <!-- Perfectly formatted centered column: Eyebrow -> Title UP -> Subtitle BELOW -->
          <header class="qs-pricing-centered-header" style="display:flex;flex-direction:column;align-items:center;text-align:center;margin:0 auto 56px;max-width:960px;width:100%;">
            <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:9999px;background:rgba(255,90,31,0.1);color:#ff5a1f;border:1px solid rgba(255,90,31,0.25);font:700 11px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:20px;">
              <span>04 / INVESTMENT</span>
            </div>
            <h2 style="font:800 clamp(3rem,5.6vw,5.2rem)/1.06 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#141413;margin:0 auto 18px;max-width:920px;">
              Transparent pricing. No agency markup<span style="color:#ff5a1f;">.</span>
            </h2>
            <p style="color:#71717a;font-size:clamp(1.1rem,1.8vw,1.32rem);max-width:640px;margin:0 auto;line-height:1.65;font-weight:450;">
              Simple monthly partnerships. Zero long-term lock-in. Full intellectual property ownership.
            </p>
          </header>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:32px;align-items:stretch;">
            <!-- Tier 1: AI Agency Plan -->
            <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:28px;padding:48px 40px;box-shadow:0 8px 30px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                  <span style="font:700 12px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#ff5a1f;">AI CREATIVE AGENCY</span>
                  <span style="padding:6px 12px;border-radius:9999px;background:rgba(255,90,31,0.1);color:#ff5a1f;font:700 11px/1 'DM Mono',monospace;">POPULAR</span>
                </div>
                <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:16px;">
                  <span style="font:800 clamp(3rem,4.5vw,4rem)/1 'Cabinet Grotesk',sans-serif;color:#141413;">$290</span>
                  <span style="font-size:16px;color:#71717a;font-weight:500;">/ month</span>
                </div>
                <p style="color:#71717a;font-size:15px;line-height:1.6;margin-bottom:32px;">
                  For high-growth consumer and SaaS brands needing continuous creative variations, rapid ad refreshes, and living brand assets.
                </p>

                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:16px;border-top:1px solid rgba(0,0,0,0.06);padding-top:28px;">
                  <li style="display:flex;gap:12px;align-items:center;color:#141413;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Autonomous ad variation swarms
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#141413;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Fatigue telemetry &amp; auto-rotation
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#141413;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Brand kit &amp; guardrails enforcement
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#141413;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> 48-hour delivery turnaround
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#141413;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> 100% intellectual property ownership
                  </li>
                </ul>
              </div>

              <div style="margin-top:40px;">
                <a href="#contact" class="btn" style="width:100%;text-align:center;background:#141413;color:#ffffff;border-radius:9999px;padding:16px 28px;font:700 15px 'Cabinet Grotesk',sans-serif;display:block;text-decoration:none;">
                  Get Started →
                </a>
              </div>
            </div>

            <!-- Tier 2: Managed Studio Sprint -->
            <div style="background:#141413;border:1px solid #ff5a1f;border-radius:28px;padding:48px 40px;color:#ffffff;box-shadow:0 24px 60px rgba(0,0,0,0.3);display:flex;flex-direction:column;justify-content:space-between;position:relative;">
              <div style="position:absolute;top:-14px;right:32px;background:#ff5a1f;color:#ffffff;font:800 11px/1 'Cabinet Grotesk',sans-serif;padding:6px 14px;border-radius:9999px;letter-spacing:0.06em;text-transform:uppercase;">
                DEDICATED SENIOR SQUAD
              </div>

              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                  <span style="font:700 12px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#ff5a1f;">MANAGED STUDIO SPRINT</span>
                </div>
                <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:16px;">
                  <span style="font:800 clamp(3rem,4.5vw,4rem)/1 'Cabinet Grotesk',sans-serif;color:#ffffff;">$3,500</span>
                  <span style="font-size:16px;color:rgba(255,255,255,0.6);font-weight:500;">/ sprint</span>
                </div>
                <p style="color:rgba(255,255,255,0.75);font-size:15px;line-height:1.6;margin-bottom:32px;">
                  For ambitious teams and founders needing dedicated senior design, full-stack software engineering, and custom AI pipeline development.
                </p>

                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:16px;border-top:1px solid rgba(255,255,255,0.1);padding-top:28px;">
                  <li style="display:flex;gap:12px;align-items:center;color:#ffffff;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Dedicated senior designer &amp; engineer
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#ffffff;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Production React / Next.js / Rust codebases
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#ffffff;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Custom LLM fine-tuning &amp; edge deployment
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#ffffff;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Direct Slack channel with the team
                  </li>
                  <li style="display:flex;gap:12px;align-items:center;color:#ffffff;font-size:14.5px;font-weight:500;">
                    <span style="color:#ff5a1f;font-weight:700;">✓</span> Unlimited revisions within active sprint
                  </li>
                </ul>
              </div>

              <div style="margin-top:40px;">
                <a href="#contact" class="btn" style="width:100%;text-align:center;background:#ff5a1f;color:#ffffff;border-radius:9999px;padding:16px 28px;font:700 15px 'Cabinet Grotesk',sans-serif;display:block;text-decoration:none;box-shadow:0 8px 24px rgba(255,90,31,0.4);">
                  Book a Discovery Call →
                </a>
              </div>
            </div>
          </div>
        </div>
        '''
        act.append(BeautifulSoup(pricing_html, 'html.parser'))

    # 8. FAQ ACCORDION (#faq) — Warm Paper Background (#faf9f5)
    faq = soup.find('section', id='faq')
    if faq:
        faq['class'] = ['sec', 'papier']
        faq['data-jonction'] = 'feuille'
        t = faq.find('h2', id='t-faq')
        if t:
            t.clear()
            t.append(BeautifulSoup('Frequently asked <span class="baila">questions</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = faq.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">05</span>FAQ', 'html.parser'))

        # Replace the entire FAQ container so no old questions or French text survive
        faq_container = faq.find('div', class_='faq') or faq.find('div', class_='faq__list') or faq.find('div', class_='faq-accueil')
        if faq_container:
            faq_container.clear()
            faq_html = '''
            <div class="faq__accordeon">
              <div class="faq__list">
                <details class="qa" name="faq"><summary>What exactly is Quiet Studio?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>Quiet Studio is an independent AI-native product and creative studio. We work at the intersection of product strategy, experience design, full-stack software engineering, and applied AI. We build digital products, living brand systems, and intelligent tools with obsessive human craft and zero agency ceremony.</p></div></details>
                
                <details class="qa" name="faq"><summary>How do you combine human direction with AI workflows?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>We believe human creative direction is irreplaceable for taste, judgment, strategy, and empathy. AI handles the repetitive, high-volume mechanics: variation generation, asset resizing, preliminary code scaffolding, and fatigue telemetry. A senior director guides every concept, every token, and every release.</p></div></details>

                <details class="qa" name="faq"><summary>Who owns the intellectual property and code?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>You do. 100%. Upon completion and payment, all custom design files, Figma libraries, source code, neural checkpoints, and brand assets are transferred entirely to your ownership with zero ongoing licensing fees or vendor lock-in.</p></div></details>

                <details class="qa" name="faq"><summary>How fast are your delivery turnarounds?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>Our managed creative sprints typically deliver live assets within 48 to 72 hours. Comprehensive full-stack software builds and product launches operate on rapid 2-to-4 week milestones, eliminating bloated agency timelines.</p></div></details>

                <details class="qa" name="faq"><summary>Can we work with Quiet Studio as a managed service or software?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>Both. We operate an Adside-inspired dual model: you can engage our senior team directly as a managed service for turnkey design and engineering sprints, or utilize our proprietary operating systems and tools to accelerate your in-house teams.</p></div></details>

                <details class="qa" name="faq"><summary>What technology stack do you build with?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>We engineer with modern, production-grade stacks: TypeScript, React, Next.js, Node.js, Python, Rust, and Tailwind CSS. For local intelligence, we compile models for Apple Silicon and edge NPUs, ensuring zero latency and uncompromising security.</p></div></details>

                <details class="qa" name="faq"><summary>How do we get started on a project?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>Reach out through our contact form or email hello@thequietstudio.space. We schedule a concise 20-minute discovery session to understand your requirements, agree on scope and deliverables, and begin your first sprint within days.</p></div></details>

                <details class="qa" name="faq"><summary>Why choose Quiet Studio over a traditional agency or internal hire?<span class="qa__ico" aria-hidden="true"></span></summary><div class="qa__a"><p>Traditional agencies carry heavy overhead, endless account-management bloat, and slow execution. An in-house senior engineer and designer costs $300k+/year before benefits. Quiet Studio gives you dedicated senior talent and proprietary AI acceleration at transparent, flat-rate monthly pricing.</p></div></details>
              </div>
            </div>
            '''
            faq_container.append(BeautifulSoup(faq_html, 'html.parser'))

    # 9. CLOSING CTA & FOOTER (#contact & .pied)
    # Remove old .pied-revele wrapper if present and replace with a stunning, mathematically aligned Apple/Google grade closing section
    pied_revele = soup.find('div', class_='pied-revele')
    if pied_revele:
        # Unwrap contents so no broken transform parallax clips or misplaces elements
        pied_revele.unwrap()

    pied_revele_in = soup.find('div', class_='pied-revele__in')
    if pied_revele_in:
        pied_revele_in.unwrap()

    cta = soup.find('section', id='contact')
    if not cta:
        cta = soup.find('section', class_='cta')
    if cta:
        cta['id'] = 'contact'
        cta['class'] = ['sec', 'qs-closing-cta-sec']
        cta.clear()
        closing_cta_html = '''
        <div class="wrap" style="padding:48px 24px 44px;max-width:1120px;margin:0 auto;text-align:center;">
          <h2 style="font:800 clamp(3.2rem,6.5vw,5.8rem)/1.04 'Cabinet Grotesk',sans-serif;letter-spacing:-0.03em;color:#ffffff;margin:0 auto 24px;max-width:920px;">
            We build brands that <span style="font-family:'Baila',serif;font-style:italic;color:#ff5a1f;">endure</span>.
            <span aria-hidden="true" class="etoile" style="display:inline-block;width:32px;height:32px;background:#ff5a1f;-webkit-mask-image:url(/assets/img/formes/etoile-huit.svg);mask-image:url(/assets/img/formes/etoile-huit.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;vertical-align:middle;margin-left:8px;"></span>
          </h2>

          <p style="color:rgba(255,255,255,0.72);font-size:clamp(1.1rem,1.8vw,1.38rem);line-height:1.65;max-width:700px;margin:0 auto 44px;">
            Whether you are shaping an intelligent product, building a living brand system, or deploying autonomous creative pipelines, our senior team is ready.
          </p>

          <!-- Centered Interactive Primary Action Pill -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:18px;margin-bottom:56px;">
            <a href="mailto:hello@thequietstudio.space" class="qs-primary-cta-pill" style="display:inline-flex;align-items:center;gap:14px;padding:18px 42px;border-radius:9999px;background:#ff5a1f;color:#ffffff;font:800 17px/1 'Cabinet Grotesk',sans-serif;text-decoration:none;box-shadow:0 12px 36px rgba(255,90,31,0.35);transition:transform 0.22s cubic-bezier(0.16,1,0.3,1),box-shadow 0.22s ease;">
              <span>hello@thequietstudio.space</span>
              <span aria-hidden="true" style="font-size:18px;line-height:1;">→</span>
            </a>
            <span style="font:600 13px 'DM Mono',monospace;color:rgba(255,255,255,0.45);letter-spacing:0.04em;">
              DIRECT SENIOR PARTNER ACCESS · RESPONSE WITHIN 24 HOURS
            </span>
          </div>

          <!-- Studio Presence Clocks Bar -->
          <div style="display:inline-flex;flex-wrap:wrap;justify-content:center;gap:24px 36px;padding:18px 32px;border-radius:9999px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex;align-items:center;gap:8px;font:600 13px 'DM Mono',monospace;color:rgba(255,255,255,0.65);">
              <span>SF</span><span class="clock__time c-time" data-tz="America/Los_Angeles" style="color:#ff5a1f;">--:--</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font:600 13px 'DM Mono',monospace;color:rgba(255,255,255,0.65);">
              <span>NYC</span><span class="clock__time c-time" data-tz="America/New_York" style="color:#ff5a1f;">--:--</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font:600 13px 'DM Mono',monospace;color:rgba(255,255,255,0.65);">
              <span>LDN</span><span class="clock__time c-time" data-tz="Europe/London" style="color:#ff5a1f;">--:--</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font:600 13px 'DM Mono',monospace;color:rgba(255,255,255,0.65);">
              <span>PAR</span><span class="clock__time c-time" data-tz="Europe/Paris" style="color:#ff5a1f;">--:--</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font:600 13px 'DM Mono',monospace;color:rgba(255,255,255,0.65);">
              <span>TYO</span><span class="clock__time c-time" data-tz="Asia/Tokyo" style="color:#ff5a1f;">--:--</span>
            </div>
          </div>
        </div>
        '''
        cta.append(BeautifulSoup(closing_cta_html, 'html.parser'))

    # Clean, Beautiful Studio Footer
    pied = soup.find('footer', class_='pied')
    if pied:
        pied.clear()
        footer_html = '''
        <div class="wrap" style="padding:36px 24px 40px;max-width:1160px;margin:0 auto;border-top:1px solid rgba(255,255,255,0.1);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:48px;padding-bottom:50px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <!-- Col 1: Identity -->
            <div>
              <span style="font:800 22px/1 'Cabinet Grotesk',sans-serif;color:#ffffff;display:inline-block;letter-spacing:-0.03em;margin-bottom:14px;">
                QUIET STUDIO<span style="color:#ff5a1f;">.</span>
              </span>
              <p style="color:rgba(255,255,255,0.68);font-size:0.95rem;line-height:1.65;margin-bottom:20px;">
                Independent AI-native design &amp; software product studio. We combine human creative direction with intelligent workflows to build enduring digital products.
              </p>
            </div>

            <!-- Col 2: Studio Navigation -->
            <div>
              <h4 style="color:#ff5a1f;font:700 11.5px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Studio</h4>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.92rem;">
                <li><a href="#agence" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">About Quiet Studio</a></li>
                <li><a href="#expertises" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Core Services</a></li>
                <li><a href="#realisations" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Selected Work &amp; Products</a></li>
                <li><a href="#workspace" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Creative Operating System</a></li>
                <li><a href="#pricing" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Transparent Pricing</a></li>
                <li><a href="#faq" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Frequently Asked Questions</a></li>
              </ul>
            </div>

            <!-- Col 3: Products Mode -->
            <div>
              <h4 style="color:#ff5a1f;font:700 11.5px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Products Mode</h4>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.92rem;">
                <li><a href="/#apps" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Open Core Apps</a></li>
                <li><a href="/products/zen-ai" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Zen AI Runtime</a></li>
                <li><a href="/products/learnloop" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">LearnLoop App</a></li>
                <li><a href="/blog" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Blog &amp; Research Notes</a></li>
                <li><a href="/#foundations" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Design Foundations</a></li>
                <li><a href="/about" style="color:rgba(255,255,255,0.8);text-decoration:none;transition:color 0.2s;">Founder &amp; Squad</a></li>
              </ul>
            </div>

            <!-- Col 4: Direct Inquiries -->
            <div>
              <h4 style="color:#ff5a1f;font:700 11.5px/1 'DM Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Direct Inquiries</h4>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.92rem;">
                <li><a href="mailto:hello@thequietstudio.space" style="color:#ffffff;font-weight:700;text-decoration:none;">hello@thequietstudio.space</a></li>
                <li><span style="color:rgba(255,255,255,0.5);">Sprint Availability: Open</span></li>
                <li><span style="color:rgba(255,255,255,0.5);">Response time: &lt; 24h</span></li>
                <li><span style="color:rgba(255,255,255,0.5);">Remote-First Worldwide</span></li>
              </ul>
            </div>
          </div>

          <div style="padding-top:28px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;color:rgba(255,255,255,0.45);font-size:0.86rem;">
            <span>Thoughtfully conceived. Carefully designed. Intelligently built.</span>
            <span>© 2026 Quiet Studio. All rights reserved.</span>
          </div>
        </div>
        '''
        pied.append(BeautifulSoup(footer_html, 'html.parser'))

    # Extract all content inside <body>
    body = soup.find('body')
    content = ''
    if body:
        for child in body.children:
            if getattr(child, 'name', None) == 'script':
                continue
            content += str(child)
    else:
        content = str(soup)

    content = content.strip()

    # Exhaustive scrub for any residual old names or French territory terms
    scrub_pairs = [
        ('Bitwip', 'Quiet Studio'),
        ('bitwip', 'quiet-studio'),
        ('BITWIP', 'QUIET STUDIO'),
        ('Overseas France', 'Worldwide'),
        ('overseas France', 'worldwide'),
        ('French Guiana', 'San Francisco'),
        ('Guyane', 'San Francisco'),
        ('Occitanie', 'New York'),
        ('Guadeloupe', 'London'),
        ('Martinique', 'Paris'),
        ('Mayotte', 'Berlin'),
        ('Réunion', 'Tokyo'),
        ('Reunion', 'Tokyo'),
        ('French-speaking world', 'global market'),
        ('overseas market', 'modern digital product market'),
        ('in the territory where you operate', 'in your product domain'),
        ('In territories this', 'In fast-moving markets this'),
        ('communications consulting agency', 'AI-native product studio'),
        ('communications agency', 'product and AI studio'),
        ('communication agency', 'product and AI studio'),
        ('communications and marketing', 'product design and software engineering'),
        ('One agency for all the French overseas territories.', 'Independent AI-native product and creative studio.'),
    ]
    for old_s, new_s in scrub_pairs:
        content = content.replace(old_s, new_s)

    ts_path = '/Users/abhivalo360gmail.com/Downloads/quiet-studio/client/src/components/bitwip-html.ts' 
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write('export const BITWIP_BODY_HTML = ' + json.dumps(content) + ';\n')

    print(f"Successfully generated {ts_path} ({len(content)} characters)")

if __name__ == '__main__':
    build_stitched_quiet_studio()
