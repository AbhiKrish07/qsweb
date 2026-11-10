import re
import json
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties
from matplotlib.path import Path

def path_to_svg(path, y_flip=True, height=281):
    parts = []
    for vertices, code in path.iter_segments():
        if code == Path.MOVETO:
            y = (height - vertices[1]) if y_flip else vertices[1]
            parts.append(f'M{vertices[0]:.2f},{y:.2f}')
        elif code == Path.LINETO:
            y = (height - vertices[1]) if y_flip else vertices[1]
            parts.append(f'L{vertices[0]:.2f},{y:.2f}')
        elif code == Path.CURVE3:
            y1 = (height - vertices[1]) if y_flip else vertices[1]
            y2 = (height - vertices[3]) if y_flip else vertices[3]
            parts.append(f'Q{vertices[0]:.2f},{y1:.2f} {vertices[2]:.2f},{y2:.2f}')
        elif code == Path.CURVE4:
            y1 = (height - vertices[1]) if y_flip else vertices[1]
            y2 = (height - vertices[3]) if y_flip else vertices[3]
            y3 = (height - vertices[5]) if y_flip else vertices[5]
            parts.append(f'C{vertices[0]:.2f},{y1:.2f} {vertices[2]:.2f},{y2:.2f} {vertices[4]:.2f},{y3:.2f}')
        elif code == Path.CLOSEPOLY:
            parts.append('Z')
    return ' '.join(parts)

def generate_footer_svg():
    fp = FontProperties(family='Helvetica', weight='heavy')
    tp = TextPath((25, 60), 'QUIET STUDIO', size=154, prop=fp)
    d = path_to_svg(tp, y_flip=True, height=281)
    bbox = tp.get_extents()
    return f'''<svg viewBox="0 0 1201 281" role="img" aria-label="Quiet Studio" xmlns="http://www.w3.org/2000/svg">
  <path class="pl pl--quiet" d="{d}" fill="#F8F8F8"/>
  <circle class="pl pl--dot" cx="{bbox.x1 + 32:.1f}" cy="180" r="20" fill="#FC622A"/>
</svg>'''

def run():
    # Read existing bitwip-html.ts
    with open('client/src/components/bitwip-html.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the JSON string from export const BITWIP_BODY_HTML = "..."
    prefix = 'export const BITWIP_BODY_HTML = '
    if not content.startswith(prefix):
        raise ValueError("bitwip-html.ts format unexpected")
    
    body = json.loads(content[len(prefix):].strip().rstrip(';'))

    # =========================================================================
    # 1. FIX THE ENTIRE FOOTER (<footer class="pied">...</footer>)
    # =========================================================================
    footer_svg = generate_footer_svg()

    new_footer = f'''<footer class="pied">
  <div class="wrap">
    <div class="pied__sep" aria-hidden="true">
      <span class="pied__fil"></span>
      <svg class="pied__forme is-1" viewBox="0 0 32 32" fill="#FC622A" focusable="false"><path d="M15.9985 7.58776L11.0554 0L11.2967 9.19443L3.05309 6.11119L8.389 13.3997L0 15.9984L8.389 18.6003L3.05309 25.8888L11.2967 22.8056L11.0554 32L15.9985 24.4122L20.9415 32L20.7003 22.8056L28.9438 25.8888L23.6079 18.6003L32 15.9984L23.6079 13.3997L28.9438 6.11119L20.7003 9.19443L20.9415 0L15.9985 7.58776Z"/></svg>
      <svg class="pied__forme is-2" viewBox="0 0 32 32" fill="#BCA8D1" focusable="false"><path d="M16 0L16.9839 3.43233C18.5886 9.03271 22.9673 13.4114 28.5677 15.0161L32 16L28.5677 16.9839C22.9673 18.5886 18.5886 22.9673 16.9839 28.5677L16 32L15.0161 28.5677C13.4114 22.9673 9.0327 18.5886 3.43233 16.9839L0 16L3.43233 15.0161C9.0327 13.4114 13.4114 9.03271 15.0161 3.43233L16 0Z"/></svg>
      <svg class="pied__forme is-3" viewBox="0 0 32 32" fill="#CCEA2C" focusable="false"><path transform="translate(1.5 0)" d="M16.8678 11.9092C26.06 -3.96974 2.93999 -3.96974 12.1322 11.9092C2.93999 -3.96974 -8.62329 16 9.7645 16C-8.62329 16 2.93999 35.9697 12.1322 20.0908C2.93999 35.9697 26.06 35.9697 16.8678 20.0908C26.06 35.9697 37.6233 16 19.2355 16C37.6233 16 26.06 -3.96974 16.8678 11.9092Z"/></svg>
      <span class="pied__fil"></span>
    </div>

    <div class="groupe__intro">
      <p class="groupe__k">
        <span class="label">Quiet Studio</span>
        <img class="groupe__mere" src="/assets/img/marque/site-logo-blanc-point-orange.svg" alt="Quiet Studio" width="449" height="72" loading="lazy" decoding="async">
      </p>
    </div>

    <ul class="groupe" aria-label="Quiet Studio offerings">
      <li>
        <a href="#contact" data-verbe="Create">
          <span class="groupe__tete">
            <img src="/assets/img/marque/site-logo-blanc-point-orange.svg" alt="Quiet Studio" width="1201" height="281" loading="lazy" decoding="async">
            <span class="groupe__act label">Creative Agency</span>
          </span>
          <p>Independent creative studio combining thoughtful design, intelligent technology and human expertise to build enduring brand identities.</p>
          <span class="lnk">Start a project<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
        </a>
      </li>
      <li>
        <a href="/models" data-verbe="Innovate">
          <span class="groupe__tete">
            <img src="/assets/img/marque/site-logo-blanc-point-orange.svg" alt="Quiet Studio Lab" width="119" height="24" loading="lazy" decoding="async">
            <span class="groupe__act label">AI Lab</span>
          </span>
          <p>Autonomous agent squads, generative design models and AI research frameworks pushing creative tools into the future.</p>
          <span class="lnk">Explore AI Lab<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
        </a>
      </li>
      <li>
        <a href="/templates" data-verbe="Build">
          <span class="groupe__tete">
            <img src="/assets/img/marque/site-logo-blanc-point-orange.svg" alt="Quiet Foundations" width="94" height="44" loading="lazy" decoding="async">
            <span class="groupe__act label">Foundations</span>
          </span>
          <p>Open core architecture, tactile web design systems, components and minimal boilerplates built for modern teams.</p>
          <span class="lnk">View open core<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg></span>
        </a>
      </li>
    </ul>

    <nav class="pied__cols" aria-label="Footer Navigation">
      <div class="pied__col">
        <p class="label">Disciplines</p>
        <a href="#expertises"><span class="forme forme--sceau forme--lavande" aria-hidden="true"></span>Branding &amp; Identity</a>
        <a href="#expertises"><span class="forme forme--fleur forme--papaye" aria-hidden="true"></span>Design &amp; Creative</a>
        <a href="#expertises"><span class="forme forme--etoile-huit forme--citron" aria-hidden="true"></span>Writing &amp; Content</a>
        <a href="#expertises"><span class="forme forme--trefle forme--vert" aria-hidden="true"></span>Creative Production</a>
      </div>
      <div class="pied__col">
        <p class="label">Studio</p>
        <a href="#agence">About Quiet Studio</a>
        <a href="#expertises">Our Approach</a>
        <a href="#realisations">Selected Work</a>
        <a href="#actualites">Insights &amp; Essays</a>
        <a href="#faq">FAQ</a>
        <a href="https://github.com/quietstudio" target="_blank" rel="noopener">GitHub</a>
      </div>
      <div class="pied__col">
        <p class="label">Global Hubs</p>
        <a href="#territoires">London <span class="c-time" data-tz="Europe/London">--:--</span></a>
        <a href="#territoires">San Francisco <span class="c-time" data-tz="America/Los_Angeles">--:--</span></a>
        <a href="#territoires">New York <span class="c-time" data-tz="America/New_York">--:--</span></a>
        <a href="#territoires">Paris <span class="c-time" data-tz="Europe/Paris">--:--</span></a>
      </div>
      <div class="pied__col">
        <p class="label">Get in Touch</p>
        <a href="mailto:glexionstriker@gmail.com">glexionstriker@gmail.com</a>
        <a href="#contact" data-cta="contactez-nous">Start a project</a>
        <a href="https://twitter.com/quietstudio" target="_blank" rel="noopener">Twitter / X</a>
        <a href="https://linkedin.com/company/quietstudio" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </nav>

    <div class="pied__logo" aria-label="Quiet Studio">
      {footer_svg}
    </div>

    <div class="pied__bas">
      <p data-curseur="Quiet Studio">&copy; 2026 Quiet Studio. All rights reserved.</p>
      <p class="pied__legal">
        <a href="/thesis">Thesis</a>
        <a href="/research">Research</a>
        <a href="#contact">Contact</a>
        <button type="button" class="pied__cookies" data-cookies>Privacy &amp; Settings</button>
      </p>
    </div>
  </div>
</footer>'''

    # Replace <footer class="pied">...</footer>
    footer_pattern = r'<footer class="pied">.*?</footer>'
    body = re.sub(footer_pattern, new_footer, body, flags=re.DOTALL)

    # =========================================================================
    # 2. REPLACE ALL BITWIP IMAGE ASSETS WITH QUIET STUDIO ASSETS
    # =========================================================================
    # Hero showreel video: replace with clean video element / poster
    body = re.sub(
        r'<video class="hh__reel"[^>]*>.*?</video>',
        '<img class="hh__reel" src="/assets/quiet/hero-holum.jpg" alt="Quiet Studio Design Work" width="1080" height="1080" style="object-fit:cover;">',
        body,
        flags=re.DOTALL
    )

    # Curated asset pool for project mappings
    asset_pool = [
        '/assets/quiet/project-atlas.jpg',
        '/assets/quiet/fintech-identity.jpg',
        '/assets/quiet/product-brand.jpg',
        '/assets/quiet/startup-presentation.jpg',
        '/assets/quiet/digital-editorial.jpg',
        '/assets/quiet/hero-holum.jpg',
        '/assets/quiet/hero-minimalist.jpg',
        '/assets/quiet/hero-rebrand.jpg',
        '/assets/quiet/hero-studio-craft.jpg',
        '/assets/quiet/hero-typography.jpg',
        '/assets/quiet/hero-brand-card.jpg',
    ]

    # Specific replacements for French overseas project images
    replacements = {
        # Projects & Cas
        r'/assets/img/cas/paei-guyane[^"\']*\.webp': '/assets/quiet/project-atlas.jpg',
        r'/assets/img/cms/projets/magasins-u-guadeloupe[^"\']*\.webp': '/assets/quiet/fintech-identity.jpg',
        r'/assets/img/cms/projets/racines-iracoubo[^"\']*\.webp': '/assets/quiet/product-brand.jpg',
        r'/assets/img/cms/projets/la-fabrique-du-degrad[^"\']*\.webp': '/assets/quiet/startup-presentation.jpg',
        r'/assets/img/cms/projets/pirac[^"\']*\.webp': '/assets/quiet/digital-editorial.jpg',
        r'/assets/img/cas/auto-reunion-developpement[^"\']*\.webp': '/assets/quiet/hero-holum.jpg',
        r'/assets/img/cas/autorama-guyane[^"\']*\.webp': '/assets/quiet/hero-minimalist.jpg',
        r'/assets/img/cas/cnes-satellites-guyane[^"\']*\.webp': '/assets/quiet/hero-typography.jpg',
        r'/assets/img/cas/gdi-one-guiana[^"\']*\.webp': '/assets/quiet/hero-studio-craft.jpg',
        r'/assets/img/cas/nikkal[^"\']*\.webp': '/assets/quiet/hero-brand-card.jpg',
        r'/assets/img/cas/pnr-guyane[^"\']*\.webp': '/assets/quiet/hero-rebrand.jpg',
        r'/assets/img/cms/projets/adtg[^"\']*\.webp': '/assets/quiet/project-atlas.jpg',
        r'/assets/img/cms/projets/biomasse[^"\']*\.webp': '/assets/quiet/fintech-identity.jpg',
        r'/assets/img/cms/projets/guyane-connect[^"\']*\.webp': '/assets/quiet/product-brand.jpg',
        r'/assets/img/cms/projets/label-pil[^"\']*\.webp': '/assets/quiet/startup-presentation.jpg',
        r'/assets/img/cms/projets/medley-concerts-music[^"\']*\.webp': '/assets/quiet/digital-editorial.jpg',
        r'/assets/img/cms/projets/mobapi[^"\']*\.webp': '/assets/quiet/hero-holum.jpg',
        r'/assets/img/cms/projets/orchestra-guadeloupe[^"\']*\.webp': '/assets/quiet/hero-minimalist.jpg',
        r'/assets/img/cms/projets/parfumerie-club-beaute[^"\']*\.webp': '/assets/quiet/hero-rebrand.jpg',
        r'/assets/img/cms/projets/paroles-de-famille[^"\']*\.webp': '/assets/quiet/hero-studio-craft.jpg',
        r'/assets/img/cms/projets/solidarite-btp[^"\']*\.webp': '/assets/quiet/hero-typography.jpg',

        # Agency team & office photos
        r'/assets/img/cms/vie-agence/[^"\']*\.webp': '/assets/quiet/hero-studio-craft.jpg',
        r'/assets/img/vie-agence/[^"\']*\.webp': '/assets/quiet/hero-typography.jpg',
        r'/assets/img/photos-bitwip/[^"\']*\.webp': '/assets/quiet/hero-holum.jpg',
        r'/assets/img/territoires/[^"\']*\.webp': '/assets/quiet/hero-minimalist.jpg',
        r'/assets/img/timbres/[^"\']*\.webp': '/assets/quiet/hero-brand-card.jpg',
        r'/assets/img/cms/actualites/[^"\']*\.webp': '/assets/quiet/digital-editorial.jpg',
    }

    for pat, rep in replacements.items():
        body = re.sub(pat, rep, body)

    # Clean up any leftover srcset pointing to old webp assets so browser uses our high-res images
    body = re.sub(r'data-srcset="[^"]*"', '', body)
    body = re.sub(r'srcset="[^"]*"', '', body)
    body = re.sub(r'data-galerie="[^"]*"', '', body)

    # Replace old video links in testimonials
    body = re.sub(r'href="https://www\.youtube\.com/watch\?v=[^"]*"', 'href="#contact"', body)
    body = re.sub(r'data-film-youtube="[^"]*"', '', body)
    body = re.sub(r'data-film-mp4="[^"]*"', '', body)

    # Clean up all client logos in the logos bande to modern tech brands
    logo_pool = [
        '/assets/img/logos-clients/linear.svg',
        '/assets/img/logos-clients/figma.svg',
        '/assets/img/logos-clients/notion.svg',
        '/assets/img/logos-clients/stripe.svg',
        '/assets/img/logos-clients/vercel.svg',
        '/assets/img/logos-clients/openai.svg',
        '/assets/img/logos-clients/github.svg',
        '/assets/img/logos-clients/raycast.svg',
        '/assets/img/logos-clients/arc.svg',
        '/assets/img/logos-clients/supabase.svg',
        '/assets/img/logos-clients/resend.svg',
        '/assets/img/logos-clients/nextjs.svg',
    ]

    # Replace all client logo img sources with our tech partner pool
    logo_idx = 0
    def replace_logo(match):
        nonlocal logo_idx
        chosen = logo_pool[logo_idx % len(logo_pool)]
        logo_idx += 1
        return f'src="{chosen}"'

    body = re.sub(r'src="/assets/img/logos-clients/[^"]*"', replace_logo, body)

    # Global text cleanups
    body = re.sub(r'\bBitwip\b', 'Quiet Studio', body, flags=re.IGNORECASE)
    body = body.replace('09 80 80 82 42', 'glexionstriker@gmail.com')
    body = body.replace('tel:+33980808242', 'mailto:glexionstriker@gmail.com')

    # Output back to TypeScript
    ts_code = f"export const BITWIP_BODY_HTML = {json.dumps(body)};\n"
    with open('client/src/components/bitwip-html.ts', 'w', encoding='utf-8') as out:
        out.write(ts_code)

    print(f"Successfully overhauled bitwip-html.ts! ({len(body)} characters)")

if __name__ == '__main__':
    run()
