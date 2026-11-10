import re
import json
from bs4 import BeautifulSoup

def build_quiet_studio_site():
    with open('bitwip-site-main/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract body inner content
    m = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL)
    if not m:
        raise ValueError("Could not extract body from index.html")
    body = m.group(1).strip()

    # =========================================================================
    # 01. GLOBAL BRANDING & WORDMARKS
    # =========================================================================
    body = body.replace('Bitwip, tech and creative communications agency', 'Quiet Studio — Creative work, reimagined')
    body = body.replace('Bitwip, the tech and creative communications agency', 'Quiet Studio, an independent creative studio combining thoughtful design, intelligent technology and human expertise')
    body = re.sub(r'\bBitwip\b', 'Quiet Studio', body)

    # Navigation bar titles
    body = body.replace('aria-label="Bitwip, back to home"', 'aria-label="Quiet Studio, back to home"')
    body = body.replace('alt="Bitwip"', 'alt="Quiet Studio"')
    body = body.replace(
        'Four disciplines, one <span class="nw">team<span class="etoile" aria-hidden="true"></span></span>',
        'Three disciplines, one <span class="nw">studio<span class="etoile" aria-hidden="true"></span></span>'
    )
    body = body.replace(
        'Many industries, one <span class="nw">commitment<span class="etoile" aria-hidden="true"></span></span>',
        'Thoughtful work, lasting <span class="nw">impact<span class="etoile" aria-hidden="true"></span></span>'
    )

    # =========================================================================
    # 02. HERO SECTION (#hh)
    # =========================================================================
    body = body.replace('The communications agency where', 'Creative work, reimagined.')
    body = body.replace('<span class="mj__m">tech</span>', '<span class="mj__m">We</span>')
    body = body.replace('<span class="mj__m">meets</span>', '<span class="mj__m">build</span>')
    
    # Letters for "brands," in line 2
    old_letters = '''<span class="mj__c" style="--r:6">c</span><span class="mj__c" style="--r:7">r</span><span class="mj__c" style="--r:8">e</span><span class="mj__c" style="--r:9">a</span><span class="mj__c" style="--r:10">t</span><span class="mj__c" style="--r:11">i</span><span class="mj__c" style="--r:12">v</span><span class="mj__c" style="--r:13">i</span><span class="mj__c" style="--r:14">t</span><span class="mj__c" style="--r:15">y</span>'''
    new_letters = '''<span class="mj__c" style="--r:6">b</span><span class="mj__c" style="--r:7">r</span><span class="mj__c" style="--r:8">a</span><span class="mj__c" style="--r:9">n</span><span class="mj__c" style="--r:10">d</span><span class="mj__c" style="--r:11">s</span>'''
    body = body.replace(old_letters, new_letters)

    # Hero showreel poster
    body = body.replace('poster="/assets/video/showreel-bitwip-agence-communication.webp"', 'poster="/assets/quiet/hero-holum.jpg"')
    body = body.replace('aria-label="Bitwip showreel: clips from the agency’s projects"', 'aria-label="Quiet Studio showreel: design, branding and intelligent craft"')

    # Hero Manifesto overlay text
    body = re.sub(
        r'<p class="hh__phr">.*?</p>',
        '<p class="hh__phr">We build brands, create design and find the right words.<br><span class="label" style="display:inline-block;margin-top:16px;color:var(--papaye);font-size:0.45em;letter-spacing:0.12em;text-transform:uppercase;">BRANDING · DESIGN · WRITING · CREATIVE PRODUCTION</span></p>',
        body,
        flags=re.DOTALL
    )

    # Hero Global Hub Clocks (London, San Francisco, New York, Paris)
    old_clocks_pattern = r'<div class="clocks" role="group" aria-label="Local time at our locations">.*?</div>\s*</div>'
    new_clocks = '''<div class="clocks" role="group" aria-label="Global Studio Hubs">
        <a class="clock" href="#territoires" data-ville="">
          <span class="clock__city">London</span>
          <span class="clock__time c-time" data-tz="Europe/London">--:--</span>
          <span class="sr-only">, London Studio Hub</span>
        </a>
        <a class="clock" href="#territoires" data-ville="">
          <span class="clock__city">San Francisco</span>
          <span class="clock__time c-time" data-tz="America/Los_Angeles">--:--</span>
          <span class="sr-only">, San Francisco Studio Hub</span>
        </a>
        <a class="clock" href="#territoires" data-ville="">
          <span class="clock__city">New York</span>
          <span class="clock__time c-time" data-tz="America/New_York">--:--</span>
          <span class="sr-only">, New York Studio Hub</span>
        </a>
        <a class="clock" href="#territoires" data-ville="">
          <span class="clock__city">Paris</span>
          <span class="clock__time c-time" data-tz="Europe/Paris">--:--</span>
          <span class="sr-only">, Paris Studio Hub</span>
        </a>
      </div>
    </div>'''
    body = re.sub(old_clocks_pattern, new_clocks, body, flags=re.DOTALL)

    # =========================================================================
    # 03. ABOUT SECTION (#agence)
    # =========================================================================
    body = body.replace(
        'We believe in <span class="baila">meaningful</span> communication <span class="etoile" aria-hidden="true"></span>',
        'A different way to approach <span class="baila">creative work</span>.<span class="etoile" aria-hidden="true"></span>'
    )
    body = re.sub(
        r'<p class="sensee__lead">.*?</p>\s*<p class="sensee__p">.*?</p>',
        '''<p class="sensee__lead">We believe great creative work comes from understanding what makes a business different.</p>
      <p class="sensee__p">Quiet Studio brings branding, design and writing together through thoughtful strategy and intelligent production.</p>''',
        body,
        flags=re.DOTALL
    )

    old_tags = r'<ul class="ag-tags" aria-label="Labels and networks">.*?</ul>'
    new_tags = '''<ul class="ag-tags" aria-label="Core Studio Capabilities">
        <li><span class="ag-tag"><span class="ag-tag__r">Discipline</span><span class="ag-tag__n">Branding</span></span></li>
        <li><span class="ag-tag"><span class="ag-tag__r">Discipline</span><span class="ag-tag__n">Design</span></span></li>
        <li><span class="ag-tag"><span class="ag-tag__r">Discipline</span><span class="ag-tag__n">Writing</span></span></li>
        <li><span class="ag-tag"><span class="ag-tag__r">Method</span><span class="ag-tag__n">Intelligent AI</span></span></li>
      </ul>'''
    body = re.sub(old_tags, new_tags, body, flags=re.DOTALL)

    # Replace the 4 statistics/years in .sensee__chiffres with the 4 principles
    old_chiffres = r'<dl class="sensee__chiffres" data-counts data-reveal style="--d:\.1s">.*?</dl>'
    new_chiffres = '''<div class="sensee__chiffres sensee__principles" data-reveal style="--d:.1s">
      <div class="sc sc--principle">
        <span class="sc__n"><span class="label" style="font-size:12px;color:var(--papaye);letter-spacing:0.08em;font-weight:700;">01 — THOUGHTFUL</span></span>
        <p class="sc__t" style="margin-top:6px;line-height:1.45;"><strong>Deep understanding before visual execution.</strong> Unpacking business mechanics and audience drivers first.</p>
      </div>
      <div class="sc sc--principle">
        <span class="sc__n"><span class="label" style="font-size:12px;color:var(--papaye);letter-spacing:0.08em;font-weight:700;">02 — INTELLIGENT</span></span>
        <p class="sc__t" style="margin-top:6px;line-height:1.45;"><strong>Modern AI workflows.</strong> Intelligent systems accelerate production without compromising human craft.</p>
      </div>
      <div class="sc sc--principle">
        <span class="sc__n"><span class="label" style="font-size:12px;color:var(--papaye);letter-spacing:0.08em;font-weight:700;">03 — CONSISTENT</span></span>
        <p class="sc__t" style="margin-top:6px;line-height:1.45;"><strong>Cohesive touchpoints.</strong> Unified visual tone, voice, and design systems across every touchpoint.</p>
      </div>
      <div class="sc sc--principle">
        <span class="sc__n"><span class="label" style="font-size:12px;color:var(--papaye);letter-spacing:0.08em;font-weight:700;">04 — HUMAN-LED</span></span>
        <p class="sc__t" style="margin-top:6px;line-height:1.45;"><strong>Senior creative direction.</strong> Guided end-to-end by experienced designers and writers.</p>
      </div>
    </div>'''
    body = re.sub(old_chiffres, new_chiffres, body, flags=re.DOTALL)

    # Replace agency photos in about section
    body = body.replace('/assets/img/cms/vie-agence/equipe-mo-kontan-to-cayenne.webp', '/assets/quiet/hero-studio-craft.jpg')
    body = body.replace('/assets/img/cms/vie-agence/equipe-selfie-auditorium.webp', '/assets/quiet/hero-typography.jpg')
    body = body.replace('/assets/img/cms/vie-agence/equipe-devanture-agence.webp', '/assets/quiet/hero-brand-card.jpg')
    body = body.replace('/assets/img/cms/vie-agence/eventails-bitwip.webp', '/assets/quiet/hero-rebrand.jpg')
    body = body.replace('/assets/img/cms/vie-agence/equipe-selfie-plage.webp', '/assets/quiet/hero-minimalist.jpg')

    # =========================================================================
    # 04. SERVICES SECTION (#expertises)
    # =========================================================================
    body = body.replace(
        '<h2 class="head__t" data-reveal>Our <span class="baila">services</span> <span class="etoile" aria-hidden="true"></span></h2>',
        '<h2 class="head__t" data-reveal>What we <span class="baila">do</span>.<span class="etoile" aria-hidden="true"></span></h2>'
    )
    body = body.replace('Strategy &amp; consulting', 'Branding &amp; Identity')
    body = body.replace('Strategy & consulting', 'Branding & Identity')
    body = body.replace(
        'Analyzing your context, clarifying your message, setting the course: a communication strategy and an action plan suited to your resources.',
        'Building distinct visual and verbal identities from the ground up to help your business communicate with conviction.'
    )
    body = body.replace(
        'Audit and assessment',
        'Brand strategy & positioning'
    )
    body = body.replace(
        'Communication strategy',
        'Visual identity systems'
    )
    body = body.replace(
        'Media plan',
        'Logo design & typography'
    )
    body = body.replace(
        'Brand platform',
        'Brand guidelines & design systems'
    )
    body = body.replace(
        'Give your communications a clear structure',
        'Explore branding & identity'
    )

    # Service 2: Design & Creative
    body = body.replace(
        'Build your brand awareness',
        'Crafting digital and physical experiences that elevate your brand.'
    )
    body = body.replace(
        'Explore design & creative',
        'Explore design'
    )

    # Service 3: Writing & Content
    body = body.replace('Web &amp; digital', 'Writing &amp; Content')
    body = body.replace('Web & digital', 'Writing & Content')
    body = body.replace(
        'Take your organization digital',
        'Finding the right words to make your brand understood and remembered.'
    )

    # =========================================================================
    # 05. SELECTED WORK (#realisations)
    # =========================================================================
    body = body.replace(
        'They trusted us with <span class="baila">their project</span> <span class="etoile" aria-hidden="true"></span>',
        'Good work speaks for <span class="baila">itself</span>.<span class="etoile" aria-hidden="true"></span>'
    )
    body = body.replace(
        'Since 2012, we’ve supported more than 100 organizations in Overseas France and mainland France.',
        'A selection of branding, design and writing projects created for ambitious businesses.'
    )

    # Swap projects with Quiet Studio portfolio items
    body = body.replace('/assets/img/cas/paei-guyane--g11.webp', '/assets/quiet/project-atlas.jpg')
    body = body.replace('PAEI Guyane', 'Project Atlas')
    body = body.replace('How do you make European funds known across French Guiana, a territory as large as Portugal?', 'Complete brand identity and digital experience for an architecture and spatial design studio.')

    body = body.replace('/assets/img/cms/projets/magasins-u-guadeloupe.webp', '/assets/quiet/fintech-identity.jpg')
    body = body.replace('Magasins U Guadeloupe', 'Fintech Identity')
    body = body.replace('How do you bring a major retailer closer to Guadeloupeans and their daily lives?', 'Visual identity, messaging framework and product design for a modern financial platform.')

    body = body.replace('/assets/img/cms/projets/racines-iracoubo.webp', '/assets/quiet/product-brand.jpg')
    body = body.replace('Racines d’Iracoubo', 'Product Brand')
    body = body.replace('How do you turn a traditional cassava bakery into an appealing regional brand?', 'Brand positioning, packaging design and launch campaign for a premium consumer brand.')

    body = body.replace('/assets/img/cms/projets/la-fabrique-du-degrad.webp', '/assets/quiet/startup-presentation.jpg')
    body = body.replace('La Fabrique du Dégrad', 'Startup Presentation')
    body = body.replace('How do you present an eco-tourism project that combines culture, nature and heritage?', 'Investor pitch deck, brand guidelines and visual storytelling for an early-stage technology company.')

    body = body.replace('/assets/img/cms/projets/pirac.webp', '/assets/quiet/digital-editorial.jpg')
    body = body.replace('PIRAC', 'Digital Editorial')
    body = body.replace('How do you raise awareness among Caribbean populations about major natural hazards?', 'Content strategy, editorial design and digital publication for a cultural media platform.')

    # =========================================================================
    # 06. TESTIMONIALS / COLLABORATION (#confiance)
    # =========================================================================
    body = body.replace(
        'More than 100 clients <span class="baila">trust</span> us <span class="etoile" aria-hidden="true"></span>',
        'Built through <span class="baila">collaboration</span>.<span class="etoile" aria-hidden="true"></span>'
    )
    body = body.replace('Word from our clients', 'Collaboration')

    # Replace client quotes
    quotes = [
        ('“Quiet Studio helped us clarify our brand and communicate what makes our product unique. The process was thoughtful, collaborative and remarkably fast.”', 'Founder, Technology Studio', 'Brand & Strategy'),
        ('“Working with Quiet Studio gave our brand a cohesive identity that feels both modern and timeless. Their attention to detail across design and writing is exceptional.”', 'Creative Director, Consumer Brand', 'Visual Identity'),
        ('“They took the time to understand our vision before proposing solutions. The resulting brand identity has given us complete confidence in how we present ourselves.”', 'Managing Partner, Investment Firm', 'Identity & Guidelines')
    ]

    # Inject modern tech client logos into the marquee
    body = body.replace('/assets/img/logos-clients/ars.svg', '/assets/img/logos-clients/linear.svg')
    body = body.replace('/assets/img/logos-clients/cnes.svg', '/assets/img/logos-clients/figma.svg')
    body = body.replace('/assets/img/logos-clients/edf.svg', '/assets/img/logos-clients/notion.svg')
    body = body.replace('/assets/img/logos-clients/france-travail.svg', '/assets/img/logos-clients/stripe.svg')
    body = body.replace('/assets/img/logos-clients/magasins-u.svg', '/assets/img/logos-clients/vercel.svg')
    body = body.replace('/assets/img/logos-clients/europe-en-guyane.svg', '/assets/img/logos-clients/openai.svg')

    # =========================================================================
    # 07. WORK WITH US / GLOBAL STUDIO (#territoires)
    # =========================================================================
    body = body.replace(
        'In <span class="baila">your</span> territory, on your <span class="nw">time<span class="etoile" aria-hidden="true"></span></span>',
        'Wherever you’re building, we’re <span class="baila">ready to create</span>.<span class="etoile" aria-hidden="true"></span>'
    )
    body = body.replace(
        'Our reach goes beyond our offices: we support businesses across all the French overseas territories, and mainland France.',
        'Quiet Studio operates as a remote-first creative studio, collaborating seamlessly with clients across time zones and geographies.'
    )
    body = body.replace('Our offices', 'Global Studio Hubs')

    # Hub 1: London
    body = body.replace('French Guiana', 'London')
    body = body.replace('Cayenne', 'United Kingdom')
    body = body.replace('1 place Schœlcher', 'Europe & Global Hub')
    body = body.replace('97300 Cayenne', 'GMT / BST')
    body = body.replace('CAY', 'LON')
    body = body.replace('data-tz="America/Cayenne"', 'data-tz="Europe/London"')
    body = body.replace('data-office-tz="America/Cayenne"', 'data-office-tz="Europe/London"')
    body = body.replace('/assets/img/photos-bitwip/guyane-plage-800.webp', '/assets/quiet/hero-holum.jpg')

    # Hub 2: San Francisco
    body = body.replace('Martinique', 'San Francisco')
    body = body.replace('Fort-de-France', 'California')
    body = body.replace('14 rue Lazare Carnot', 'Silicon Valley & US West')
    body = body.replace('97200 Fort-de-France', 'PST / PDT')
    body = body.replace('FDF', 'SFO')
    body = body.replace('data-tz="America/Martinique"', 'data-tz="America/Los_Angeles"')
    body = body.replace('data-office-tz="America/Martinique"', 'data-office-tz="America/Los_Angeles"')
    body = body.replace('/assets/img/photos-bitwip/martinique-plage-800.webp', '/assets/quiet/hero-minimalist.jpg')

    # Hub 3: New York
    body = body.replace('Guadeloupe', 'New York')
    body = body.replace('Baie-Mahault', 'New York')
    body = body.replace('Immeuble Le Phare', 'East Coast & Global Finance')
    body = body.replace('97122 Baie-Mahault', 'EST / EDT')
    body = body.replace('PTP', 'NYC')
    body = body.replace('data-tz="America/Guadeloupe"', 'data-tz="America/New_York"')
    body = body.replace('data-office-tz="America/Guadeloupe"', 'data-office-tz="America/New_York"')
    body = body.replace('/assets/img/photos-bitwip/guadeloupe-plage-800.webp', '/assets/quiet/hero-rebrand.jpg')

    # Hub 4: Paris
    body = body.replace('Réunion', 'Paris')
    body = body.replace('Saint-Denis', 'France')
    body = body.replace('2 rue Émile Hugot', 'Continental Europe & Design')
    body = body.replace('97490 Sainte-Clotilde', 'CET / CEST')
    body = body.replace('RUN', 'PAR')
    body = body.replace('data-tz="Indian/Reunion"', 'data-tz="Europe/Paris"')
    body = body.replace('data-office-tz="Indian/Reunion"', 'data-office-tz="Europe/Paris"')
    body = body.replace('/assets/img/photos-bitwip/reunion-plage-800.webp', '/assets/quiet/hero-studio-craft.jpg')

    # =========================================================================
    # 08. INSIGHTS SECTION (#actualites)
    # =========================================================================
    body = body.replace(
        'Trends and <span class="baila">behind the scenes</span> <span class="etoile" aria-hidden="true"></span>',
        'Perspectives on design, technology and <span class="baila">brand building</span>.<span class="etoile" aria-hidden="true"></span>'
    )
    body = body.replace(
        'Our latest articles, our methods and life at the agency.',
        'Essays and operating principles from our multidisciplinary studio squad.'
    )
    body = body.replace('News', 'Insights')

    # 6 Quiet Studio Articles
    articles_html = '''<div class="jca" id="jca-rail" data-carrousel>
      <article class="actu" data-cat="branding" data-reveal>
        <div class="actu__media">
          <img src="/assets/quiet/hero-minimalist.jpg" alt="Branding" width="1200" height="800" loading="lazy" decoding="async">
        </div>
        <p class="actu__meta"><span class="actu__cat">Branding</span><span>5 min read</span><time datetime="2026-11-01">Nov 2026</time></p>
        <h3 class="actu__t"><a href="#contact">Why Most Modern Brands Look the Same (And How to Stand Out)</a></h3>
        <p class="actu__ex">The homogeneity trap in modern brand identity and how to craft enduring distinction.</p>
      </article>
      <article class="actu" data-cat="technology" data-reveal>
        <div class="actu__media">
          <img src="/assets/quiet/hero-holum.jpg" alt="Technology" width="1200" height="800" loading="lazy" decoding="async">
        </div>
        <p class="actu__meta"><span class="actu__cat">Technology</span><span>6 min read</span><time datetime="2026-11-03">Nov 2026</time></p>
        <h3 class="actu__t"><a href="#contact">AI in the Creative Process: Tool, Collaborator, or Threat?</a></h3>
        <p class="actu__ex">How human taste, judgment, and restraint elevate machine velocity into true craftsmanship.</p>
      </article>
      <article class="actu" data-cat="writing" data-reveal>
        <div class="actu__media">
          <img src="/assets/quiet/digital-editorial.jpg" alt="Writing" width="1200" height="800" loading="lazy" decoding="async">
        </div>
        <p class="actu__meta"><span class="actu__cat">Writing</span><span>4 min read</span><time datetime="2026-11-05">Nov 2026</time></p>
        <h3 class="actu__t"><a href="#contact">The Art of the One-Liner: How Great Brands Say More with Less</a></h3>
        <p class="actu__ex">Crafting sharp positioning statements that stick in memory and drive action.</p>
      </article>
      <article class="actu" data-cat="design" data-reveal>
        <div class="actu__media">
          <img src="/assets/quiet/hero-studio-craft.jpg" alt="Design" width="1200" height="800" loading="lazy" decoding="async">
        </div>
        <p class="actu__meta"><span class="actu__cat">Design</span><span>7 min read</span><time datetime="2026-11-07">Nov 2026</time></p>
        <h3 class="actu__t"><a href="#contact">The Return to Craft: Why Physical Detail Matters in a Digital World</a></h3>
        <p class="actu__ex">Why tactile paper grain, responsive micro-interactions, and spatial depth build genuine trust.</p>
      </article>
      <article class="actu" data-cat="strategy" data-reveal>
        <div class="actu__media">
          <img src="/assets/quiet/hero-brand-card.jpg" alt="Strategy" width="1200" height="800" loading="lazy" decoding="async">
        </div>
        <p class="actu__meta"><span class="actu__cat">Strategy</span><span>5 min read</span><time datetime="2026-11-09">Nov 2026</time></p>
        <h3 class="actu__t"><a href="#contact">Building a Brand Before You Have a Product: A Guide for Founders</a></h3>
        <p class="actu__ex">How early stage brand foundations attract top tier talent, capital, and early adopters.</p>
      </article>
      <article class="actu" data-cat="studio" data-reveal>
        <div class="actu__media">
          <img src="/assets/quiet/hero-typography.jpg" alt="Studio" width="1200" height="800" loading="lazy" decoding="async">
        </div>
        <p class="actu__meta"><span class="actu__cat">Studio</span><span>8 min read</span><time datetime="2026-11-10">Nov 2026</time></p>
        <h3 class="actu__t"><a href="#contact">Inside Quiet Studio: How We Use AI to Build Better Brands Faster</a></h3>
        <p class="actu__ex">A transparent look at our agile sprints, rapid prototyping loops, and senior creative direction.</p>
      </article>
    </div>'''
    body = re.sub(r'<div class="jca" id="jca-rail" data-carrousel>.*?</div>\s*</div>\s*</div>\s*</section>', articles_html + '\n</div></div></section>', body, flags=re.DOTALL)

    # =========================================================================
    # 09. FAQ SECTION (#faq)
    # =========================================================================
    body = body.replace(
        'Got questions <span class="baila baila--ponct">?</span>',
        'Everything you need to <span class="baila">know</span><span class="baila baila--ponct">.</span>'
    )
    
    faqs_html = '''<div class="faq__list">
      <details class="qa" name="faq" open>
        <summary>What does Quiet Studio do?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>Quiet Studio is an independent creative studio specializing in branding, design and writing. We help businesses build clear, compelling identities through strategic brand development, visual systems, website design and brand copy.</p></div>
      </details>
      <details class="qa" name="faq">
        <summary>Who do you work with?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>We work with ambitious founders, startups, creative agencies and established businesses looking to elevate their brand presence. Whether launching a new venture or refreshing an existing identity, we tailor our approach to your stage and goals.</p></div>
      </details>
      <details class="qa" name="faq">
        <summary>How long does a typical project take?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>Most branding and design projects run between 3 to 8 weeks, depending on scope. Brand sprints can be completed in as little as 2 weeks, while comprehensive identity systems and website design projects typically take 6 to 10 weeks.</p></div>
      </details>
      <details class="qa" name="faq">
        <summary>How do you use AI in your creative process?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>We use AI tools strategically for research, concept exploration and production acceleration. However, all creative direction, strategic thinking, design decisions and final writing are led entirely by experienced human creatives. AI speeds up our process; human taste defines the quality.</p></div>
      </details>
      <details class="qa" name="faq">
        <summary>Can you work with our existing brand guidelines?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>Yes. We often work within established brand systems to design new touchpoints, develop campaign materials, refine messaging, or evolve visual identities that have outgrown their original guidelines.</p></div>
      </details>
      <details class="qa" name="faq">
        <summary>Do you offer ongoing design partnerships?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>Yes. For select clients, we offer retainer-based creative partnerships providing ongoing design, content and brand support on a monthly basis.</p></div>
      </details>
      <details class="qa" name="faq">
        <summary>How do we get started?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>Reach out through our contact form or send us an email. We’ll set up an initial conversation to discuss your project, goals and timeline, followed by a detailed proposal and scope of work.</p></div>
      </details>
      <details class="qa" name="faq">
        <summary>Where is Quiet Studio located?<span class="qa__ico" aria-hidden="true"></span></summary>
        <div class="qa__a"><p>We are a remote-first studio working with clients globally, primarily across North America, Europe and the Asia-Pacific region.</p></div>
      </details>
    </div>'''
    body = re.sub(r'<div class="faq__list">.*?</div>\s*</div>\s*</div>\s*</section>', faqs_html + '\n</div></div></section>', body, flags=re.DOTALL)

    # =========================================================================
    # 10. CTA SECTION (.cta)
    # =========================================================================
    body = body.replace(
        'We’ve got <span class="baila">guts,</span> just like <span class="nw">you<span class="etoile" aria-hidden="true"></span></span>',
        'Have something in <span class="baila">mind?</span> Let’s talk about your <span class="nw">project<span class="etoile" aria-hidden="true"></span></span>'
    )
    body = body.replace(
        'A project, a question? The team responds Monday to Friday.',
        'Whether you’re launching something new, refreshing an existing brand, or looking for an agile creative partner, we’d love to hear from you.'
    )
    body = body.replace('09 80 80 82 42', 'glexionstriker@gmail.com')
    body = body.replace('tel:+33980808242', 'mailto:glexionstriker@gmail.com')
    body = body.replace('Contact us', 'Start a conversation')

    # =========================================================================
    # 11. FOOTER (.pied)
    # =========================================================================
    body = body.replace('Since 2012', 'Quiet Studio')
    body = body.replace('© 2026 Quiet Studio.', '© 2026 Quiet Studio. All rights reserved.')
    body = body.replace('Bitwip Conseil', 'Quiet Studio Group')
    body = body.replace('/assets/img/triptyque/bitwip-conseil.webp', '/assets/img/marque/site-logo-blanc-point-orange.svg')
    body = body.replace('/assets/img/triptyque/bitwip-ia.svg', '/assets/img/marque/site-logo-blanc-point-orange.svg')
    body = body.replace('/assets/img/triptyque/morpho.svg', '/assets/img/marque/site-logo-blanc-point-orange.svg')
    body = body.replace('Bitwip IA', 'Quiet Studio Lab')
    body = body.replace('Morpho', 'Quiet Foundations')

    # Output to TypeScript file
    ts_code = f"export const BITWIP_BODY_HTML = {json.dumps(body)};\n"
    with open('client/src/components/bitwip-html.ts', 'w', encoding='utf-8') as out:
        out.write(ts_code)

    print(f"Successfully generated client/src/components/bitwip-html.ts ({len(body)} characters)!")

if __name__ == '__main__':
    build_quiet_studio_site()
