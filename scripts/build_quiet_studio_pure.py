import re
import json
from bs4 import BeautifulSoup

def clean_pure():
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

    # 1. HERO (#hh)
    hh = soup.find('section', id='hh')
    if hh:
        # Title
        t = hh.find('h1', class_='hh__titre')
        if t:
            t.clear()
            sr = soup.new_tag('span', **{'class': 'sr-only'})
            sr.string = 'Quiet Studio | Independent Creative Studio'
            t.append(sr)

            lead = soup.new_tag('span', **{'class': 'mj__lead', 'aria-hidden': 'true'})
            lead.string = 'INDEPENDENT CREATIVE STUDIO'
            t.append(lead)

            l1 = soup.new_tag('span', **{'class': 'mj__l1', 'aria-hidden': 'true'})
            l1.append(BeautifulSoup('<span class="mj__m"><span class="mj__c" style="--r:0">C</span><span class="mj__c" style="--r:1">r</span><span class="mj__c" style="--r:2">e</span><span class="mj__c" style="--r:3">a</span><span class="mj__c" style="--r:4">t</span><span class="mj__c" style="--r:5">i</span><span class="mj__c" style="--r:6">v</span><span class="mj__c" style="--r:7">e</span></span> <span class="mj__trou"></span> <span class="mj__m"><span class="mj__c" style="--r:8">w</span><span class="mj__c" style="--r:9">o</span><span class="mj__c" style="--r:10">r</span><span class="mj__c" style="--r:11">k</span><span class="mj__c" style="--r:12">,</span></span>', 'html.parser'))
            t.append(l1)

            l2 = soup.new_tag('span', **{'class': 'mj__l2', 'aria-hidden': 'true'})
            l2.append(BeautifulSoup('<span class="mj__m"><span class="mj__c" style="--r:13">r</span><span class="mj__c" style="--r:14">e</span><span class="mj__c" style="--r:15">i</span><span class="mj__c" style="--r:16">m</span><span class="mj__c" style="--r:17">a</span><span class="mj__c" style="--r:18">g</span><span class="mj__c" style="--r:19">i</span><span class="mj__c" style="--r:20">n</span><span class="mj__c" style="--r:21">e</span><span class="mj__c" style="--r:22">d</span></span><span class="etoile mj__etoile"></span>', 'html.parser'))
            t.append(l2)

        for ghost in hh.find_all('div', class_=['mj__fantome', 'mj__copie']):
            glead = ghost.find('div', class_='mj__lead')
            if glead: glead.string = 'INDEPENDENT CREATIVE STUDIO'
            gl1 = ghost.find('div', class_='mj__l1')
            if gl1:
                gl1.clear()
                gl1.append(BeautifulSoup('<span class="mj__m"><span class="mj__c" style="--r:0">C</span><span class="mj__c" style="--r:1">r</span><span class="mj__c" style="--r:2">e</span><span class="mj__c" style="--r:3">a</span><span class="mj__c" style="--r:4">t</span><span class="mj__c" style="--r:5">i</span><span class="mj__c" style="--r:6">v</span><span class="mj__c" style="--r:7">e</span></span> <span class="mj__trou"></span> <span class="mj__m"><span class="mj__c" style="--r:8">w</span><span class="mj__c" style="--r:9">o</span><span class="mj__c" style="--r:10">r</span><span class="mj__c" style="--r:11">k</span><span class="mj__c" style="--r:12">,</span></span>', 'html.parser'))
            gl2 = ghost.find('div', class_='mj__l2')
            if gl2:
                gl2.clear()
                gl2.append(BeautifulSoup('<span class="mj__m"><span class="mj__c" style="--r:13">r</span><span class="mj__c" style="--r:14">e</span><span class="mj__c" style="--r:15">i</span><span class="mj__c" style="--r:16">m</span><span class="mj__c" style="--r:17">a</span><span class="mj__c" style="--r:18">g</span><span class="mj__c" style="--r:19">i</span><span class="mj__c" style="--r:20">n</span><span class="mj__c" style="--r:21">e</span><span class="mj__c" style="--r:22">d</span></span><span class="etoile mj__etoile"></span>', 'html.parser'))

        vid = hh.find('video')
        if vid:
            vid['poster'] = '/assets/quiet/hero-holum.jpg'
            vid['aria-label'] = 'Quiet Studio showreel: thoughtful branding, design and writing'

        # Global clocks
        clocks = hh.find('div', class_='clocks')
        if clocks:
            clocks['aria-label'] = 'Global Creative Time Zones'
            clocks.clear()
            clocks_html = '''
            <a class="clock" href="#territoires"><span class="clock__city">London</span><span class="clock__time c-time" data-tz="Europe/London">--:--</span><span class="sr-only">, London Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">New York</span><span class="clock__time c-time" data-tz="America/New_York">--:--</span><span class="sr-only">, New York Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">San Francisco</span><span class="clock__time c-time" data-tz="America/Los_Angeles">--:--</span><span class="sr-only">, San Francisco Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">Tokyo</span><span class="clock__time c-time" data-tz="Asia/Tokyo">--:--</span><span class="sr-only">, Tokyo Time</span></a>
            <a class="clock" href="#territoires"><span class="clock__city">Bengaluru</span><span class="clock__time c-time" data-tz="Asia/Kolkata">--:--</span><span class="sr-only">, Bengaluru Time</span></a>
            '''
            clocks.append(BeautifulSoup(clocks_html, 'html.parser'))

        # Manifest
        manif = hh.find('p', class_='hh__manif')
        if manif:
            manif.clear()
            manif_html = '''<span class="hh__phr" data-mots="">
              <strong style="color:#ffffff;font-size:1.35em;display:block;margin-bottom:12px;font-weight:700;letter-spacing:-0.02em;">We build brands, create design and find the right words.</strong>
              <span style="display:block;font-size:0.95em;line-height:1.65;color:rgba(255,255,255,0.92);max-width:680px;">
                Quiet Studio is an independent creative studio combining thoughtful design, intelligent technology and human expertise to help businesses build their identity and communicate with clarity.
              </span>
              <span class="label" style="display:inline-block;margin-top:18px;color:var(--papaye);font-size:0.85em;letter-spacing:0.12em;font-weight:700;text-transform:uppercase;">
                BRANDING · DESIGN · WRITING · CREATIVE PRODUCTION
              </span>
            </span>'''
            manif.append(BeautifulSoup(manif_html, 'html.parser'))

    # 2. STUDIO INTRODUCTION (#agence)
    ag = soup.find('section', id='agence')
    if ag:
        t = ag.find('h2', id='t-agence')
        if t:
            t.clear()
            t.append(BeautifulSoup('A different way to approach <span class="baila">creative work</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        # Clean tags
        tags_ul = ag.find('ul', class_='ag-tags')
        if tags_ul:
            tags_ul.clear()
            tags_ul['aria-label'] = 'Core Creative Disciplines'
            tags_html = '''
            <li><span class="ag-tag"><span class="ag-tag__r">Discipline</span> <span class="ag-tag__n">Branding &amp; Identity</span></span></li>
            <li><span class="ag-tag"><span class="ag-tag__r">Discipline</span> <span class="ag-tag__n">Design &amp; Creative</span></span></li>
            <li><span class="ag-tag"><span class="ag-tag__r">Discipline</span> <span class="ag-tag__n">Writing &amp; Content</span></span></li>
            <li><span class="ag-tag"><span class="ag-tag__r">Approach</span> <span class="ag-tag__n">Intelligent Production</span></span></li>
            '''
            tags_ul.append(BeautifulSoup(tags_html, 'html.parser'))

        lead = ag.find('p', class_='sensee__lead')
        if lead:
            lead.string = 'Great creative work begins with understanding. Before designing an identity, creating a visual or writing a message, we take the time to understand the business behind it: what it stands for, who it speaks to and what it needs to communicate.'

        p = ag.find('p', class_='sensee__p')
        if p:
            p.string = 'Quiet Studio brings branding, design and writing together through a considered creative process. We combine human creative direction with intelligent AI-assisted workflows, allowing us to spend less time on repetitive production and more time on the decisions that make creative work meaningful. The result is a more connected way to build and maintain your brand.'

        btn = ag.find('a', class_='sensee__btn')
        if btn:
            btn.clear()
            btn.append(BeautifulSoup('Discover Quiet Studio<svg aria-hidden="true" fill="none" viewBox="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"></path></svg>', 'html.parser'))

        chiffres = ag.find('dl', class_='sensee__chiffres')
        if chiffres:
            chiffres.clear()
            chiffres_html = '''
            <div class="sc sc--principle" style="padding:22px;border:1px solid rgba(0,0,0,0.08);border-radius:18px;background:rgba(255,255,255,0.85);margin-bottom:12px;">
              <span class="label" style="font-size:12px;color:var(--papaye);font-weight:700;letter-spacing:0.08em;display:block;">01 — THOUGHTFUL</span>
              <p style="margin-top:6px;font-size:0.95rem;line-height:1.5;color:#111111;"><strong>Every project starts with understanding.</strong> Clarifying the problem, audience, and intended outcome before designing.</p>
            </div>
            <div class="sc sc--principle" style="padding:22px;border:1px solid rgba(0,0,0,0.08);border-radius:18px;background:rgba(255,255,255,0.85);margin-bottom:12px;">
              <span class="label" style="font-size:12px;color:var(--papaye);font-weight:700;letter-spacing:0.08em;display:block;">02 — INTELLIGENT</span>
              <p style="margin-top:6px;font-size:0.95rem;line-height:1.5;color:#111111;"><strong>Technology supports production.</strong> AI workflows accelerate research and drafting, helping us work more efficiently.</p>
            </div>
            <div class="sc sc--principle" style="padding:22px;border:1px solid rgba(0,0,0,0.08);border-radius:18px;background:rgba(255,255,255,0.85);margin-bottom:12px;">
              <span class="label" style="font-size:12px;color:var(--papaye);font-weight:700;letter-spacing:0.08em;display:block;">03 — CONSISTENT</span>
              <p style="margin-top:6px;font-size:0.95rem;line-height:1.5;color:#111111;"><strong>A brand should feel unified.</strong> We build around your brand’s identity, voice, and existing creative direction.</p>
            </div>
            <div class="sc sc--principle" style="padding:22px;border:1px solid rgba(0,0,0,0.08);border-radius:18px;background:rgba(255,255,255,0.85);">
              <span class="label" style="font-size:12px;color:var(--papaye);font-weight:700;letter-spacing:0.08em;display:block;">04 — HUMAN-LED</span>
              <p style="margin-top:6px;font-size:0.95rem;line-height:1.5;color:#111111;"><strong>Creative judgment remains central.</strong> Senior creative direction, discernment, and refinement shape every deliverable.</p>
            </div>
            '''
            chiffres.append(BeautifulSoup(chiffres_html, 'html.parser'))

        # Replace old agency photos with Quiet Studio brand assets
        ag_vie = ag.find('div', class_='ag-vie')
        if ag_vie:
            ag_vie.clear()
            ag_vie_html = '''
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;padding:32px 0 0;">
              <div style="border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);"><img src="/assets/quiet/hero-studio-craft.jpg" alt="Studio Craft" style="width:100%;height:260px;object-fit:cover;"></div>
              <div style="border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);"><img src="/assets/quiet/hero-typography.jpg" alt="Typography System" style="width:100%;height:260px;object-fit:cover;"></div>
              <div style="border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);"><img src="/assets/quiet/digital-editorial.jpg" alt="Editorial Publication" style="width:100%;height:260px;object-fit:cover;"></div>
            </div>
            '''
            ag_vie.append(BeautifulSoup(ag_vie_html, 'html.parser'))

    # 3. SERVICES (#expertises)
    xp = soup.find('section', id='expertises')
    if xp:
        t = xp.find('h2', class_='head__t')
        if t:
            t.clear()
            t.append(BeautifulSoup('Everything your brand needs to <span class="baila">communicate better</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        items = xp.find_all('details', class_='xep__item')
        if len(items) >= 4:
            # 01
            items[0].find('h3', class_='xep__t').string = 'Branding & Identity'
            items[0].find('p', class_='xep__d').string = 'A strong brand is more than a logo. It is the identity, language and visual system that shape how people recognise and understand your business. We develop thoughtful brand foundations and visual identities that give businesses a clear and consistent way to present themselves.'
            ul1 = items[0].find('ul', class_='xep__p')
            if ul1:
                ul1.clear()
                ul1.append(BeautifulSoup('<li>Brand strategy and positioning</li><li>Logo design and visual identity</li><li>Typography and colour systems</li><li>Brand guidelines & messaging</li>', 'html.parser'))
            # Replace xvit in item 0
            xvit0 = items[0].find('div', class_='xvit')
            if xvit0:
                xvit0.clear()
                xvit0.append(BeautifulSoup('<div style="padding:16px 0;"><img src="/assets/quiet/fintech-identity.jpg" alt="Fintech Identity" style="width:100%;max-width:540px;border-radius:18px;object-fit:cover;box-shadow:0 12px 40px rgba(0,0,0,0.4);"></div>', 'html.parser'))

            # 02
            items[1].find('h3', class_='xep__t').string = 'Design & Creative'
            items[1].find('p', class_='xep__d').string = 'Good design makes information easier to understand and ideas easier to remember. We create visual communication across digital and print formats, helping businesses present their products, services and ideas with clarity and consistency.'
            ul2 = items[1].find('ul', class_='xep__p')
            if ul2:
                ul2.clear()
                ul2.append(BeautifulSoup('<li>Presentation and pitch deck design</li><li>Brochures and publications</li><li>Packaging and product design</li><li>Digital design systems</li>', 'html.parser'))
            xvit1 = items[1].find('div', class_='xvit')
            if xvit1:
                xvit1.clear()
                xvit1.append(BeautifulSoup('<div style="padding:16px 0;"><img src="/assets/quiet/product-brand.jpg" alt="Product Brand" style="width:100%;max-width:540px;border-radius:18px;object-fit:cover;box-shadow:0 12px 40px rgba(0,0,0,0.4);"></div>', 'html.parser'))

            # 03
            items[2].find('h3', class_='xep__t').string = 'Writing & Content'
            items[2].find('p', class_='xep__d').string = 'Every business has something worth communicating. The challenge is expressing it clearly. We help businesses develop their voice, explain their ideas and create written content that feels consistent with their identity and useful to their audience.'
            ul3 = items[2].find('ul', class_='xep__p')
            if ul3:
                ul3.clear()
                ul3.append(BeautifulSoup('<li>Website and landing-page copy</li><li>Brand messaging and positioning</li><li>Blog articles and editorial content</li><li>Founder and business communication</li>', 'html.parser'))
            xvit2 = items[2].find('div', class_='xvit')
            if xvit2:
                xvit2.clear()
                xvit2.append(BeautifulSoup('<div style="padding:16px 0;"><img src="/assets/quiet/digital-editorial.jpg" alt="Editorial System" style="width:100%;max-width:540px;border-radius:18px;object-fit:cover;box-shadow:0 12px 40px rgba(0,0,0,0.4);"></div>', 'html.parser'))

            # 04
            items[3].find('h3', class_='xep__t').string = 'Creative Production'
            items[3].find('p', class_='xep__d').string = 'Combining human creative direction with intelligent AI-assisted workflows to deliver high-quality design assets, brand guidelines, and copy sprints on schedule.'
            ul4 = items[3].find('ul', class_='xep__p')
            if ul4:
                ul4.clear()
                ul4.append(BeautifulSoup('<li>AI-assisted asset exploration</li><li>Bespoke visual components</li><li>Rapid sprint delivery</li><li>Human-led quality assurance</li>', 'html.parser'))
            xvit3 = items[3].find('div', class_='xvit')
            if xvit3:
                xvit3.clear()
                xvit3.append(BeautifulSoup('<div style="padding:16px 0;"><img src="/assets/quiet/hero-studio-craft.jpg" alt="Creative Production" style="width:100%;max-width:540px;border-radius:18px;object-fit:cover;box-shadow:0 12px 40px rgba(0,0,0,0.4);"></div>', 'html.parser'))

    # 4. SELECTED WORK (#realisations)
    rea = soup.find('section', id='realisations')
    if rea:
        t = rea.find('h2', id='t-cases')
        if t:
            t.clear()
            t.append(BeautifulSoup('Good work speaks for <span class="baila">itself</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        pi = rea.find('p', class_='piste__i')
        if pi:
            pi.string = 'Every business has a different story. Explore a selection of creative work, experiments and visual directions developed by Quiet Studio.'

        cartes = rea.find('div', class_='piste__cartes')
        if cartes:
            projects_data = [
                {
                    'title': 'Fintech Identity',
                    'cat': 'Branding & Identity',
                    'tag': 'Branding',
                    'desc': 'A visual identity exploration for a contemporary financial technology company. The project explores how typography, colour and a structured visual system can communicate trust, clarity and modern financial services.',
                    'img': '/assets/quiet/fintech-identity.jpg'
                },
                {
                    'title': 'Product Brand',
                    'cat': 'Branding & Identity',
                    'tag': 'Branding',
                    'desc': 'A complete identity direction for a modern consumer product brand, exploring packaging, visual language and a consistent system across physical and digital touchpoints.',
                    'img': '/assets/quiet/product-brand.jpg'
                },
                {
                    'title': 'Startup Presentation',
                    'cat': 'Design & Creative',
                    'tag': 'Design',
                    'desc': 'A presentation system designed to help an early-stage company communicate its product, business model and vision through clear storytelling and structured visual design.',
                    'img': '/assets/quiet/startup-presentation.jpg'
                },
                {
                    'title': 'Editorial System',
                    'cat': 'Writing & Design',
                    'tag': 'Writing',
                    'desc': 'An editorial direction exploring the relationship between writing, typography and information design through a publication built around a focused subject.',
                    'img': '/assets/quiet/digital-editorial.jpg'
                },
                {
                    'title': 'Brand Voice System',
                    'cat': 'Writing',
                    'tag': 'Writing',
                    'desc': 'A brand language and messaging system demonstrating how a business can develop a consistent voice across its website, product descriptions, email communication and social content.',
                    'img': '/assets/quiet/hero-typography.jpg'
                }
            ]

            cartes.clear()
            for p in projects_data:
                card_html = f'''
                <article class="qr" data-metier="studio-concept">
                  <p class="qr__client">
                    <span class="label" style="color:var(--papaye);font-weight:700;">Studio concept</span>
                    <span class="tag">{p['cat']}</span>
                    <span class="tag tag--metier"><span aria-hidden="true" class="forme forme--sceau forme--lavande"></span>{p['tag']}</span>
                  </p>
                  <div class="qr__media">
                    <img alt="{p['title']}" src="{p['img']}" decoding="async" height="1280" loading="lazy" width="1440" style="object-fit:cover;width:100%;height:100%;border-radius:18px;"/>
                  </div>
                  <div class="qr__corps">
                    <h3 class="qr__q"><a class="qr__lien" data-verbe="View concept" href="#contact">{p['title']}</a></h3>
                    <p class="qr__a" style="color:rgba(255,255,255,0.88);line-height:1.55;font-size:0.95rem;">{p['desc']}</p>
                  </div>
                </article>
                '''
                cartes.append(BeautifulSoup(card_html, 'html.parser'))

    # 5. CLIENT STORIES / COLLABORATION (#confiance)
    conf = soup.find('section', id='confiance')
    if conf:
        t = conf.find('h2', id='t-confiance')
        if t:
            t.clear()
            t.append(BeautifulSoup('A good process makes <span class="baila">good collaboration</span>.<span aria-hidden="true" class="etoile"></span>', 'html.parser'))

        k = conf.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">04</span>Collaboration', 'html.parser'))

        wrap = conf.find('div', class_='wrap')
        if wrap:
            head = wrap.find('header', class_='head')
            wrap.clear()
            wrap.append(head)

            collab_html = '''
            <div class="nouvelles" data-reveal style="--d:.08s;margin-top:40px;">
              <p style="font-size:1.25rem;line-height:1.6;color:#111111;max-width:760px;margin-bottom:36px;font-weight:500;">
                We keep projects transparent from the beginning. Clear briefs, visible progress, structured feedback and organised delivery help everyone understand what is happening and what comes next.
              </p>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;width:100%;">
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">01 — CLEAR BRIEFS</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Defined Scope &amp; Goals</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Every project begins with defined deliverables, explicit timelines, and reference alignment before any work starts.</p>
                </div>
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">02 — VISIBLE PROGRESS</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Regular Milestones</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Creative work is shared at scheduled milestones so feedback is gathered early and revisions remain focused and rapid.</p>
                </div>
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">03 — STRUCTURED FEEDBACK</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Direct Communication</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">You collaborate directly with senior designers and writers—no account managers or distorted games of telephone.</p>
                </div>
                <div style="padding:32px 28px;background:rgba(255,255,255,0.92);border:1px solid rgba(0,0,0,0.08);border-radius:24px;box-shadow:0 4px 20px rgba(0,0,0,0.04);">
                  <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">04 — ORGANISED DELIVERY</span>
                  <h4 style="margin:14px 0 8px;font-size:1.35rem;font-weight:700;color:#111111;">Production-Ready Files</h4>
                  <p style="font-size:0.95rem;line-height:1.55;color:#27272a;">Final deliverables are clean, documented, and ready for deployment across digital, print, and presentation environments.</p>
                </div>
              </div>
            </div>
            '''
            wrap.append(BeautifulSoup(collab_html, 'html.parser'))

    # 6. GLOBAL STUDIO (#territoires)
    terr = soup.find('section', id='territoires')
    if terr:
        wrap = terr.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            terr_html = '''
            <header class="head head--seul">
              <p class="head__k label"><span class="head__n">05</span>Global Studio</p>
              <h2 class="head__t" data-reveal="" id="t-terr">Wherever you’re building, we’re <span class="baila">ready to create</span>.<span aria-hidden="true" class="etoile"></span></h2>
              <p class="head__i head__perimetre" data-reveal="" style="--d:.05s;max-width:760px;font-size:1.15rem;line-height:1.6;color:rgba(255,255,255,0.85);margin-top:16px;">
                Quiet Studio is a remote-first creative studio working with businesses and individuals across different markets. Whether you’re building a new company, developing an existing brand or looking for consistent creative support, we are interested in working with people who value thoughtful creative work.
              </p>
            </header>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:28px;margin-top:48px;">
              <article style="padding:36px 32px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">01 / REMOTE-FIRST</span>
                <h3 style="margin:16px 0 10px;font-size:1.6rem;color:#ffffff;font-weight:700;">Worldwide Collaboration</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.88);font-size:1rem;">Our team operates across international time zones with asynchronous workflows and scheduled syncs, enabling frictionless creative partnerships from North America to Europe and Asia.</p>
              </article>
              <article style="padding:36px 32px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">02 / DIRECT ACCESS</span>
                <h3 style="margin:16px 0 10px;font-size:1.6rem;color:#ffffff;font-weight:700;">Founder-to-Creator</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.88);font-size:1rem;">Zero bureaucratic middlemen. You collaborate directly with senior designers, strategists, and writers dedicated to your sprint, keeping communications sharp and decisions fast.</p>
              </article>
              <article style="padding:36px 32px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:24px;">
                <span class="label" style="color:var(--papaye);font-size:12px;letter-spacing:0.08em;font-weight:700;">03 / FOCUSED SPRINTS</span>
                <h3 style="margin:16px 0 10px;font-size:1.6rem;color:#ffffff;font-weight:700;">Thoughtful Turnaround</h3>
                <p style="line-height:1.6;color:rgba(255,255,255,0.88);font-size:1rem;">Structured weekly sprints with agreed deliverables and clear timelines. We value momentum without sacrificing the discernment that makes creative work memorable.</p>
              </article>
            </div>
            '''
            wrap.append(BeautifulSoup(terr_html, 'html.parser'))

    # 7. INSIGHTS (#actualites)
    act = soup.find('section', id='actualites')
    if act:
        wrap = act.find('div', class_='wrap')
        if wrap:
            wrap.clear()
            act_html = '''
            <header class="head">
              <p class="head__k label"><span class="head__n">06</span>Insights</p>
              <h2 class="head__t" data-reveal="" id="t-journal">Ideas, observations and <span class="baila">things worth sharing</span>.<span aria-hidden="true" class="etoile"></span></h2>
              <div class="head__side" data-reveal="" style="--d:.1s">
                <p class="head__i" style="font-size:1.15rem;line-height:1.55;color:#27272a;">A collection of thoughts on branding, design, writing and the changing creative process.</p>
              </div>
            </header>
            <div class="jca" id="jca-rail" data-carrousel style="margin-top:40px;">
              <article class="actu" data-cat="branding" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/hero-minimalist.jpg" alt="Branding" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Branding</span><span>4 min read</span><time datetime="2026-11-01">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">Why every business needs a consistent brand identity.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">From typography and colour to language and everyday communication, consistency shapes how people recognise and understand a business.</p>
              </article>
              <article class="actu" data-cat="design" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/hero-holum.jpg" alt="Design" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Design</span><span>5 min read</span><time datetime="2026-11-03">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">Good design is more than making things look good.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">Visual design is not decoration. It is a way of organising information, establishing hierarchy and helping people understand what matters.</p>
              </article>
              <article class="actu" data-cat="writing" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/digital-editorial.jpg" alt="Writing" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Writing</span><span>4 min read</span><time datetime="2026-11-05">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">How to build a recognisable brand voice.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">A consistent brand voice makes communication feel connected. It begins with understanding the personality, audience and ideas behind a business.</p>
              </article>
              <article class="actu" data-cat="technology" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/hero-studio-craft.jpg" alt="Creative Technology" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Creative Technology</span><span>6 min read</span><time datetime="2026-11-07">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">What AI changes about creative production.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">AI is changing how creative work is researched and explored. The question is where technology genuinely improves the process without replacing taste.</p>
              </article>
              <article class="actu" data-cat="branding" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/hero-brand-card.jpg" alt="Branding" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Branding</span><span>5 min read</span><time datetime="2026-11-09">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">The difference between a logo and a brand.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">A logo is one component of an identity. A complete brand needs positioning, language, visual consistency and deep audience resonance.</p>
              </article>
              <article class="actu" data-cat="design" data-reveal>
                <div class="actu__media">
                  <img src="/assets/quiet/hero-typography.jpg" alt="Design" width="1200" height="800" loading="lazy">
                </div>
                <p class="actu__meta"><span class="actu__cat" style="color:var(--papaye);font-weight:700;">Design</span><span>5 min read</span><time datetime="2026-11-10">Nov 2026</time></p>
                <h3 class="actu__t"><a href="#contact" style="color:#111111;font-weight:700;">Why business presentations need better storytelling.</a></h3>
                <p class="actu__ex" style="color:#27272a;line-height:1.6;">A good presentation builds an argument, creates a sequence and helps an audience understand complex vision with clarity.</p>
              </article>
            </div>
            '''
            wrap.append(BeautifulSoup(act_html, 'html.parser'))

    # 8. FAQ (#faq)
    faq = soup.find('section', id='faq')
    if faq:
        t = faq.find('h2', id='t-faq')
        if t:
            t.clear()
            t.append(BeautifulSoup('A few things you <span class="baila">might want to know</span><span class="baila baila--ponct">.</span>', 'html.parser'))

        k = faq.find('p', class_='head__k')
        if k:
            k.clear()
            k.append(BeautifulSoup('<span class="head__n">07</span>FAQ', 'html.parser'))

        faq_list = faq.find('div', class_='faq__list')
        if faq_list:
            faq_list.clear()
            faqs_html = '''
            <details class="qa" name="faq" open>
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">What services does Quiet Studio offer?<span class="qa__ico" aria-hidden="true"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">We offer three core service areas: Branding &amp; Identity, Design &amp; Creative, and Writing &amp; Content. Each area includes several types of creative deliverables, from brand strategy and logo systems to presentations, pitch decks, and website copy.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">Who do you work with?<span class="qa__ico" aria-hidden="true"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">We work with startups, small and medium-sized businesses, product companies, founders and independent professionals who value thoughtful, high-craft creative work.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">How does the creative process work?<span class="qa__ico" aria-hidden="true"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Projects follow six structured stages: Enquiry, Discovery, Project Definition, Creative Development, Review, Refinement, and Final Delivery. Communication is clear, timelines are agreed, and progress is always visible.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">Do you use AI in your work?<span class="qa__ico" aria-hidden="true"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Yes. We use AI-assisted tools to support research, ideation, drafting and certain repetitive production tasks. However, creative direction, discernment, refinement and final quality decisions remain 100% human-led.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">Can you work with an existing brand identity?<span class="qa__ico" aria-hidden="true"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Yes. We frequently use existing brand guidelines, approved examples, and assets as the foundation for creating new presentations, marketing materials, or content sprints.</p></div>
            </details>
            <details class="qa" name="faq">
              <summary style="font-weight:700;color:#111111;font-size:1.15rem;">Do you offer ongoing creative support?<span class="qa__ico" aria-hidden="true"></span></summary>
              <div class="qa__a"><p style="color:#27272a;line-height:1.65;font-size:1rem;">Yes. We offer ongoing creative partnerships for businesses with recurring design and writing requirements, with agreed scope, capacity, and delivery expectations established in advance.</p></div>
            </details>
            '''
            faq_list.append(BeautifulSoup(faqs_html, 'html.parser'))

    # 9. FINAL CTA (.cta)
    cta = soup.find('section', class_='cta')
    if cta:
        t = cta.find('h2', id='t-cta')
        if t:
            t.clear()
            t.append(BeautifulSoup('Have something in <span class="baila">mind?</span><span class="etoile" aria-hidden="true"></span>', 'html.parser'))

        lead = cta.find('p', class_='lead')
        if lead:
            lead.string = 'Whether you have a clear brief or just the beginning of an idea, we’d like to hear about it. Tell us what you’re building, what you need and where you want to take it.'

        btn = cta.find('a', class_='btn--papaye')
        if btn:
            btn.clear()
            btn.append(BeautifulSoup('Start a project<span aria-hidden="true" class="btn__arrow"><svg fill="none" viewBox="0 0 16 16"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"></path></svg></span>', 'html.parser'))

        direct = cta.find('p', class_='cta__direct')
        if direct:
            direct.clear()
            direct.append(BeautifulSoup('<a href="mailto:contact@thequietstudio.space" style="color:#ffffff;font-size:1.15rem;font-weight:600;">contact@thequietstudio.space</a>', 'html.parser'))

    # 10. FOOTER (.pied)
    # Remove revealed footer overlay if present
    revele = soup.find('div', class_='pied-revele')
    if revele:
        revele.decompose()

    pied = soup.find('footer', class_='pied')
    if pied:
        pied.clear()
        with open('client/public/assets/img/marque/site-logo-blanc-point-orange.svg', 'r') as svgf:
            quiet_svg = svgf.read()
        quiet_svg_inline = re.sub(r'<\?xml.*?\?>', '', quiet_svg).strip()

        footer_html = f'''
        <div class="wrap" style="padding:60px 0 40px;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:48px;margin-bottom:56px;">
            <div>
              <div style="width:200px;margin-bottom:20px;">
                {quiet_svg_inline}
              </div>
              <p style="color:#ffffff;font-weight:700;font-size:1.15rem;margin-bottom:8px;">Creative work, reimagined.</p>
              <p style="color:rgba(255,255,255,0.78);font-size:0.95rem;line-height:1.6;">An independent creative studio focused on branding, design and writing.</p>
            </div>
            <div>
              <span class="label" style="color:var(--papaye);font-size:11px;font-weight:700;letter-spacing:0.08em;display:block;margin-bottom:16px;">EXPLORE</span>
              <ul style="display:flex;flex-direction:column;gap:12px;font-size:0.95rem;color:rgba(255,255,255,0.85);">
                <li><a href="#hh">Home</a></li>
                <li><a href="#expertises">Services</a></li>
                <li><a href="#realisations">Selected Work</a></li>
                <li><a href="#agence">About Studio</a></li>
                <li><a href="#actualites">Insights</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <span class="label" style="color:var(--papaye);font-size:11px;font-weight:700;letter-spacing:0.08em;display:block;margin-bottom:16px;">SERVICES</span>
              <ul style="display:flex;flex-direction:column;gap:12px;font-size:0.95rem;color:rgba(255,255,255,0.85);">
                <li><a href="#expertises">Branding &amp; Identity</a></li>
                <li><a href="#expertises">Design &amp; Creative</a></li>
                <li><a href="#expertises">Writing &amp; Content</a></li>
                <li><a href="#expertises">Creative Production</a></li>
              </ul>
            </div>
            <div>
              <span class="label" style="color:var(--papaye);font-size:11px;font-weight:700;letter-spacing:0.08em;display:block;margin-bottom:16px;">CONNECT</span>
              <ul style="display:flex;flex-direction:column;gap:12px;font-size:0.95rem;color:rgba(255,255,255,0.85);">
                <li><a href="mailto:contact@thequietstudio.space">contact@thequietstudio.space</a></li>
                <li><a href="https://linkedin.com/company/thequietstudio" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="#territoires">Global Studio</a></li>
                <li><a href="#faq">Frequently Asked Questions</a></li>
              </ul>
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid rgba(255,255,255,0.12);font-size:0.9rem;color:rgba(255,255,255,0.65);">
            <span>&copy; 2026 Quiet Studio. All rights reserved.</span>
            <span style="color:var(--papaye);font-weight:600;">Thoughtfully created. Intelligently produced.</span>
          </div>
        </div>
        '''
        pied.append(BeautifulSoup(footer_html, 'html.parser'))

    # Extract clean body HTML
    body = soup.find('body')
    result_html = ''.join(str(c) for c in body.children)

    # Global text cleanups: purge any remaining French terms
    result_html = re.sub(r'\bBitwip\b', 'Quiet Studio', result_html)
    result_html = re.sub(r'\bbitwip\b', 'quietstudio', result_html)
    result_html = re.sub(r'https?://(?:www\.)?quietstudio\.fr[^\s"\']*', '#contact', result_html)
    result_html = re.sub(r'/en/(?:french-guiana|martinique|guadeloupe|reunion|occitanie)', '#territoires', result_html)
    result_html = re.sub(r'/en/(?:strategy-consulting|brand-creative|web-digital|campaigns-media)', '#expertises', result_html)
    result_html = re.sub(r'/en/project-[a-z0-9-]+', '#realisations', result_html)
    result_html = re.sub(r'/en/(?:commitments|csr-charter)', '#agence', result_html)
    result_html = re.sub(r'/en/contact', '#contact', result_html)
    result_html = re.sub(r'/en/news', '#actualites', result_html)
    result_html = re.sub(r'/en/about', '#agence', result_html)

    # Write out
    ts_code = f"export const BITWIP_BODY_HTML = {json.dumps(result_html)};\n"
    with open('client/src/components/bitwip-html.ts', 'w', encoding='utf-8') as out:
        out.write(ts_code)

    print(f"Generated client/src/components/bitwip-html.ts with {len(result_html)} characters.")

if __name__ == '__main__':
    clean_pure()
