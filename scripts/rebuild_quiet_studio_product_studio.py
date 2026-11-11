import os
import re
from bs4 import BeautifulSoup

def build_product_studio_minimal():
    # Read base Bitwip structure from bitwip-site-main
    with open('bitwip-site-main/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    # Remove any existing nav element (we use our unified signature capsule header in React)
    old_nav = soup.find('header', class_='nav')
    if old_nav:
        old_nav.decompose()

    # 1. HERO SECTION (#hh) — Preserving full 3D zoom & kinetic tilt mechanics
    hh = soup.find('section', id='hh')
    if hh:
        # Title layer (.mj__cadre--titre)
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

        # Ghost / Fantome Layer (.mj__fantome): KEEP the .mj__pile, .hh__carte, .hh__reel and all 6 plaques intact!
        fantome = hh.find('div', class_='mj__fantome')
        if fantome:
            glead = fantome.find('div', class_='mj__lead')
            if glead: glead.string = 'DESIGN & PRODUCT SOFTWARE STUDIO'
            
            fl1 = fantome.find('div', class_='mj__l1')
            if fl1:
                # Find the existing pile inside .mj__trou
                pile = fl1.find('span', class_='mj__pile')
                # Reconstruct fl1 while keeping pile inside .mj__trou
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

        # Curtain Layer (.mj__copie in .hh__rideau)
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

        # Global Studio Clocks with live timezone bindings
        clocks = hh.find('div', class_='clocks')
        if clocks:
            clocks['aria-label'] = 'Global Engineering & Design Time Zones'
            clocks.clear()
            clocks_html = '''
            <a class="clock" href="#territoires"><span class="clock__city">San Francisco</span><span class="clock__time c-time" data-tz="America/Los_Angeles">--:--</span><span class="sr-only">, San Francisco Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">New York</span><span class="clock__time c-time" data-tz="America/New_York">--:--</span><span class="sr-only">, New York Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">London</span><span class="clock__time c-time" data-tz="Europe/London">--:--</span><span class="sr-only">, London Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">Tokyo</span><span class="clock__time c-time" data-tz="Asia/Tokyo">--:--</span><span class="sr-only">, Tokyo Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">Bengaluru</span><span class="clock__time c-time" data-tz="Asia/Kolkata">--:--</span><span class="sr-only">, Bengaluru Time</span></a>
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

    # 2. STUDIO PHILOSOPHY (#agence) — Section 01: Spacious, uncluttered, 2-column layout
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

        # Replace .sensee container with the full 2-column Bitwip structure (.sensee__txt + .sensee__chiffres)
        sensee = ag.find('div', class_='sensee')
        if sensee:
            sensee.clear()
            sensee_html = '''
            <div class="sensee__txt" data-reveal="">
              <p class="sensee__lead" style="color:#111111;font-size:clamp(1.25rem,2vw,1.65rem);font-weight:600;line-height:1.55;margin-bottom:24px;">
                Quiet Studio is an independent design and software product studio. We conceive, design and engineer digital products, open-core software, and applied AI systems with obsessive craft and zero ceremony.
              </p>
              <p class="sensee__p" style="color:#27272a;font-size:1.05rem;line-height:1.7;margin-bottom:28px;">
                We believe the best digital products happen when product thinking, high-craft interface design, and deep software engineering happen together under one roof. No handoff walls, no bloated agency meetings—just senior builders shipping working software.
              </p>
              <a class="lnk sensee__btn" href="#expertises" style="font-weight:600;display:inline-flex;align-items:center;gap:8px;">
                Explore our practices
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

        # Horizontal photo strip (.ag-vie): software & craft assets
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

    # 3. PRACTICES (#expertises) — Section 02: Four core engineering and design disciplines
    exp = soup.find('section', id='expertises')
    if exp:
        t = exp.find('h2', id='t-expertises')
        if t:
            t.clear()
            t.append(BeautifulSoup('Four disciplines, one <span class="baila">unified studio</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = exp.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">02</span>Practices', 'html.parser'))

        side = exp.find('div', class_='head__side')
        if side:
            p = side.find('p', class_='head__i')
            if p:
                p.clear()
                p.append(BeautifulSoup('From initial product PRD to deployed software: interface design, software engineering, applied AI, and brand systems.', 'html.parser'))

        # Practice accordions: replace communications agency copy with software practices
        items = exp.find_all('details', class_='xep__item')
        practices_data = [
            {
                'title': 'Product Strategy & Interface Design',
                'desc': 'PRDs, product architecture, tactile UX/UI, token-driven design systems, micro-interactions, and high-fidelity interactive prototypes.',
                'tags': ['PRD Architecture', 'Tactile UI/UX', 'Design Tokens', 'Interaction Prototyping']
            },
            {
                'title': 'Software & Product Engineering',
                'desc': 'Full-stack TypeScript, Next.js 15 App Router, PostgreSQL, Tailwind, robust backend architectures, low-latency APIs, and production deployments.',
                'tags': ['Next.js 15 & React 19', 'PostgreSQL & ORMs', 'Low-Latency APIs', 'Local-First Architecture']
            },
            {
                'title': 'Applied AI & Intelligent Systems',
                'desc': 'Multi-agent orchestration, custom RAG architectures, local ONNX/WebGPU inference, discreet context windows, and automated synthesis pipelines.',
                'tags': ['Multi-Agent Systems', 'Quantized Inference', 'Hybrid RAG Engines', 'Context Engineering']
            },
            {
                'title': 'Brand Systems & Product Launch',
                'desc': 'Product positioning, brand narrative, interactive launch landing pages, developer documentation, and telemetry-backed conversion optimization.',
                'tags': ['Launch Architecture', 'Brand Positioning', 'Documentation Systems', 'Growth Engineering']
            }
        ]

        for i, item in enumerate(items[:4]):
            data = practices_data[i]
            summ = item.find('summary')
            if summ:
                h3 = summ.find('h3')
                if h3:
                    h3.string = data['title']
            
            d_p = item.find('p', class_='xep__d')
            if d_p:
                d_p.string = data['desc']
            
            ul = item.find('ul', class_='xep__p')
            if ul:
                ul.clear()
                for tag in data['tags']:
                    li = soup.new_tag('li')
                    li.string = tag
                    ul.append(li)

    # 4. SELECTED WORK (#realisations) — Section 03: Quiet Studio software products
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
                p.append(BeautifulSoup('In-house tools, client software platforms, and applied intelligence systems engineered and shipped by Quiet Studio.', 'html.parser'))

        # Replace project cards with Quiet Studio in-house software
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
            
            # Title
            t_tag = card.find('h3', class_='case__t')
            if t_tag:
                a_tag = t_tag.find('a')
                if a_tag:
                    a_tag.string = data['title']
                    a_tag['href'] = '#realisations'
                else:
                    t_tag.string = data['title']

            # Label / kicker
            k_tag = card.find('p', class_='case__k')
            if k_tag:
                k_tag.string = data['tag']

            # Description
            d_tag = card.find('p', class_='case__d')
            if d_tag:
                d_tag.string = data['desc']

            # Tags list
            ul = card.find('ul', class_='case__tags')
            if ul:
                ul.clear()
                for tag in data['tags']:
                    li = soup.new_tag('li')
                    li.string = tag
                    ul.append(li)

            # Image
            img = card.find('img')
            if img:
                img['src'] = data['img']
                img['alt'] = data['title']
                if img.has_attr('srcset'): del img['srcset']
                if img.has_attr('data-src'): del img['data-src']
                if img.has_attr('data-srcset'): del img['data-srcset']

    # 5. CREDENTIALS / STANDARDS (#confiance) — Section 04 in Bitwip
    conf = soup.find('section', id='confiance')
    if conf:
        t = conf.find('h2', id='t-confiance')
        if t:
            t.clear()
            t.append(BeautifulSoup('Built with <span class="baila">engineering discipline</span> and craft.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = conf.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">04</span>Standards', 'html.parser'))

        side = conf.find('div', class_='head__side')
        if side:
            p = side.find('p', class_='head__i')
            if p:
                p.clear()
                p.append(BeautifulSoup('Quiet Studio products adhere to strict craftsmanship standards: zero unmotivated aesthetics, full TypeScript safety, and evidence over claims.', 'html.parser'))

        # Replace rail text (.piste__i)
        piste_i = conf.find('p', class_='piste__i')
        if piste_i:
            piste_i.string = 'Architected and engineered for founders, researchers, and senior product squads worldwide.'

        # Replace testimonial quotes with Quiet Studio software engineering reviews
        quotes = conf.find_all('blockquote', class_='avis')
        reviews = [
            {
                'text': 'Quiet Studio turned our complex multi-agent architecture into a production-grade system in record time. Their design precision is extraordinary.',
                'author': 'Lead Architect · Resonance Labs'
            },
            {
                'text': 'The level of craftsmanship in their interface tokens and local-first runtime is rare. No fluff, no bloated agency meetings, just high-velocity delivery.',
                'author': 'Founder & CEO · Aethel Core'
            },
            {
                'text': 'Quiet Studio bridges deep software engineering and world-class visual design effortlessly. They ship what other agencies only talk about.',
                'author': 'VP Engineering · Capture Desktop'
            }
        ]

        for i, q in enumerate(quotes[:3]):
            data = reviews[i]
            p_text = q.find('p', class_='avis__p')
            if p_text:
                p_text.string = f'“{data["text"]}”'
            cite = q.find('cite', class_='avis__auteur')
            if cite:
                cite.string = data['author']

    # 6. PRODUCT SPRINT LIFECYCLE (#territoires) — Section 05 in Bitwip
    ter = soup.find('section', id='territoires')
    if ter:
        wrap = ter.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            method_html = '''
            <header class="head">
              <p class="head__k label"><span class="head__n">05</span>The Method</p>
              <h2 class="head__t" id="t-method">From concept to <span class="baila">production release</span>.<span aria-hidden="true" class="etoile"></span></h2>
              <div class="head__side" data-reveal="" style="--d:.1s">
                <p class="head__i" style="font-size:1.15rem;line-height:1.55;color:#27272a;">A battle-tested 6-stage product lifecycle engineered to eliminate ambiguity and deliver working software fast.</p>
              </div>
            </header>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;margin-top:40px;">
              <article style="padding:28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 01</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Discover &amp; Interrogate</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Uncovering root user needs, identifying core technical constraints, interrogating assumptions, and defining crisp success criteria.</p>
              </article>

              <article style="padding:28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 02</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Architecture &amp; PRD</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Drafting exhaustive product requirement documents, system data schemas, state machine diagrams, and tech stack boundaries.</p>
              </article>

              <article style="padding:28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 03</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Tactile UI &amp; Prototyping</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Creating bespoke design tokens, interactive micro-states, keyboard mechanics, and functional prototypes that feel alive.</p>
              </article>

              <article style="padding:28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 04</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Full-Stack Engineering</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Writing clean, zero-warning TypeScript, setting up database migrations, API routes, and applied AI pipelines with high test coverage.</p>
              </article>

              <article style="padding:28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 05</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Verification &amp; Hardening</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Multi-device layout testing (390px to 4K), automated load benchmarks, edge-case hardening, and security audits.</p>
              </article>

              <article style="padding:28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">STAGE 06</span>
                <h3 style="margin:14px 0 10px;font-size:1.45rem;color:#ffffff;font-weight:700;">Launch &amp; Evolve</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.82);font-size:0.95rem;">Zero-downtime production deployment, telemetry integration, analytics tracking, and continuous sprint cycles to adapt to user feedback.</p>
              </article>
            </div>
            '''
            wrap.append(BeautifulSoup(method_html, 'html.parser'))

    # 7. INSIGHTS (#actualites) — Section 06 in Bitwip
    act = soup.find('section', id='actualites')
    if act:
        wrap = act.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            act_html = '''
            <header class="head">
              <p class="head__k label"><span class="head__n">06</span>Insights</p>
              <h2 class="head__t" data-reveal="" id="t-journal">Notes on building <span class="baila">intelligent software</span>.<span aria-hidden="true" class="etoile"></span></h2>
              <div class="head__side" data-reveal="" style="--d:.1s">
                <p class="head__i" style="font-size:1.15rem;line-height:1.55;color:#27272a;">Thoughts on product engineering, applied AI architectures, and craft from the Quiet Studio team.</p>
              </div>
            </header>

            <div class="actu" style="margin-top:36px;display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:24px;">
              <article class="actu__item" style="padding:24px;border:1px solid var(--line);border-radius:18px;background:#ffffff;">
                <p class="actu__meta" style="font-size:0.85rem;color:#71717a;margin-bottom:10px;">OCTOBER 2026 · APPLIED AI</p>
                <h3 class="actu__t" style="font-size:1.25rem;font-weight:700;margin-bottom:12px;"><a href="/blog" style="color:#111111;text-decoration:none;">Building Local-First AI: Quantization, Privacy &amp; WebGPU</a></h3>
                <p class="actu__ex" style="font-size:0.95rem;line-height:1.6;color:#52525b;">How to ship AI products that execute entirely on-device with sub-50ms latency and absolute user privacy.</p>
              </article>

              <article class="actu__item" style="padding:24px;border:1px solid var(--line);border-radius:18px;background:#ffffff;">
                <p class="actu__meta" style="font-size:0.85rem;color:#71717a;margin-bottom:10px;">SEPTEMBER 2026 · INTERFACE DESIGN</p>
                <h3 class="actu__t" style="font-size:1.25rem;font-weight:700;margin-bottom:12px;"><a href="/blog" style="color:#111111;text-decoration:none;">The Anti-Slop Manifesto: Why Modern Software Feels Generic</a></h3>
                <p class="actu__ex" style="font-size:0.95rem;line-height:1.6;color:#52525b;">Rejecting cookie-cutter templates, unmotivated gradients, and bloated cards in favor of purposeful interface craft.</p>
              </article>

              <article class="actu__item" style="padding:24px;border:1px solid var(--line);border-radius:18px;background:#ffffff;">
                <p class="actu__meta" style="font-size:0.85rem;color:#71717a;margin-bottom:10px;">AUGUST 2026 · SYSTEM ARCHITECTURE</p>
                <h3 class="actu__t" style="font-size:1.25rem;font-weight:700;margin-bottom:12px;"><a href="/blog" style="color:#111111;text-decoration:none;">Orchestrating Autonomous Squads: From PRD to Shipped Code</a></h3>
                <p class="actu__ex" style="font-size:0.95rem;line-height:1.6;color:#52525b;">Practical lessons from deploying hybrid human-agent squads on mission-critical software codebases.</p>
              </article>
            </div>
            '''
            wrap.append(BeautifulSoup(act_html, 'html.parser'))

    # 8. FAQ (#faq) — Section 07 in Bitwip
    faq = soup.find('section', id='faq')
    if faq:
        t = faq.find('h2', id='t-faq')
        if t:
            t.clear()
            t.append(BeautifulSoup('Everything you <span class="baila">might want to know</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = faq.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">07</span>FAQ', 'html.parser'))

        faq_list = faq.find('div', class_='faq__list')
        if faq_list:
            faq_list.clear()
            faq_html = '''
            <details class="qa" name="faq"><summary>What kind of products does Quiet Studio build?<span aria-hidden="true" class="qa__ico"></span></summary><div class="qa__a"><p>We build production digital products, SaaS applications, local-first developer tools, applied AI pipelines, and high-conversion brand platforms. We work with both early-stage founders building v1 from scratch and mature companies overhauling core software experiences.</p></div></details>
            <details class="qa" name="faq"><summary>How do product sprints work?<span aria-hidden="true" class="qa__ico"></span></summary><div class="qa__a"><p>Our sprints run in focused 2-week to 6-week cycles. Each sprint begins with an exhaustive technical PRD and ends with functional, tested code deployed to production. You work directly with senior builders—no account managers or communication bottlenecks.</p></div></details>
            <details class="qa" name="faq"><summary>Who owns the intellectual property and code?<span aria-hidden="true" class="qa__ico"></span></summary><div class="qa__a"><p>You do. You retain 100% full ownership of all code, designs, tokens, database schemas, and assets created during our engagement. Everything is handed over in clean, documented repositories.</p></div></details>
            <details class="qa" name="faq"><summary>What technology stacks do you use?<span aria-hidden="true" class="qa__ico"></span></summary><div class="qa__a"><p>We specialize in modern TypeScript, Next.js 15, React 19, Tailwind CSS, PostgreSQL, Node.js, Rust for high-performance desktop runtimes, and WebGPU / ONNX for on-device applied intelligence.</p></div></details>
            <details class="qa" name="faq"><summary>Do you work with teams outside our time zone?<span aria-hidden="true" class="qa__ico"></span></summary><div class="qa__a"><p>Yes. Quiet Studio operates as a remote-first studio across San Francisco, New York, London, Tokyo, and Bengaluru, enabling continuous asynchronous development with daily video and code updates.</p></div></details>
            '''
            faq_list.append(BeautifulSoup(faq_html, 'html.parser'))

    # 9. CTA SECTION (.cta) — Section 08 in Bitwip
    cta = soup.find('section', class_='cta')
    if cta:
        cta.clear()
        cta_html = '''
        <div class="wrap">
          <header class="head head--seul">
            <p class="head__k label"><span class="head__n">08</span>Let's Build</p>
            <h2 class="head__t" data-reveal="" id="t-contact">
              Turn your ambitious idea into <span class="baila">intelligent software</span>.<span aria-hidden="true" class="etoile"></span>
            </h2>
          </header>
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

    # 10. FOOTER (#contact / .pied) — Minimal directory
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
                <h4 style="color:var(--papaye);font:700 12px/1 monospace;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;">Studio</h4>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:12px;font-size:0.95rem;">
                  <li><a href="#agence" style="color:rgba(255,255,255,0.85);text-decoration:none;">About</a></li>
                  <li><a href="#expertises" style="color:rgba(255,255,255,0.85);text-decoration:none;">Practices</a></li>
                  <li><a href="#realisations" style="color:rgba(255,255,255,0.85);text-decoration:none;">Selected Work</a></li>
                  <li><a href="#territoires" style="color:rgba(255,255,255,0.85);text-decoration:none;">The Method</a></li>
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
            <span>© 2026 Quiet Studio. All rights reserved.</span>
          </div>
        </div>
        '''
        pied.append(BeautifulSoup(footer_html, 'html.parser'))

    # Extract body content
    body = soup.find('body')
    content = "".join([str(c) for c in body.children]) if body else str(soup)

    # Clean any stray French agency terms
    content = content.replace('Communications agency', 'Design & Product Software Studio')
    content = content.replace('communications agency', 'product software studio')
    content = content.replace('Overseas France', 'Worldwide')
    content = content.replace('French Guiana', 'San Francisco')
    content = content.replace('Guyane', 'California')

    # Export to client/src/components/bitwip-html.ts
    escaped = content.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')
    ts_code = f'export const BITWIP_BODY_HTML = "{escaped}";\n'

    with open('client/src/components/bitwip-html.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)

    print(f"Generated client/src/components/bitwip-html.ts ({len(ts_code)} bytes)")

if __name__ == '__main__':
    build_product_studio_minimal()
