import dracula.draw

config.load_autoconfig()
c.scrolling.smooth = True

# Font
c.fonts.default_family = 'BreezeSans'

#key bindings
config.bind('xb', 'config-cycle statusbar.show always never')
config.bind('xx', 'config-cycle statusbar.show always never ;; config-cycle tabs.show always switching')
config.bind('J', 'tab-prev')
config.bind('K', 'tab-next')
## Type: Bool
c.auto_save.session = True

#darkmode
#config.set('colors.webpage.prefers_color_scheme_dark', True)
config.set('colors.webpage.bg', 'black')
config.set('colors.webpage.darkmode.enabled', True)

# Minimize fingerprinting
config.set('content.headers.accept_language', 'en-US,en;q=0.5')
#config.set('content.headers.custom', {"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"})
config.set('content.headers.user_agent', 'Mozilla/5.0 (Windows NT 10.0; rv:68.0) Gecko/20100101 Firefox/68.0')
# Load theme
dracula.draw.blood(c, {
    'spacing': {
        'vertical': 6,
        'horizontal': 8
    }
})
