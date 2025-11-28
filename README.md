# 🚀 Portfolio Website

A modern, interactive portfolio website built with Jekyll and hosted on GitHub Pages. Features a clean design, smooth animations, and responsive layout that works beautifully on all devices.

![Portfolio Preview](assets/images/preview.png)

## ✨ Features

- 🎨 **Modern Design**: Clean and professional aesthetic with smooth animations
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Loading**: Static site generation for optimal performance
- 🎯 **SEO Optimized**: Built-in SEO tags and sitemap generation
- 📝 **Blog Ready**: Integrated blog with markdown support
- 💼 **Project Showcase**: Dedicated section for your portfolio projects
- 🏆 **Patents Section**: Highlight your intellectual property and research
- 📧 **Contact Form**: Easy integration with form services like Formspree
- 🌙 **Interactive Elements**: Typing effect, smooth scrolling, particle effects
- 🎭 **Cool Effects**: Glassmorphism, 3D transforms, custom cursor, gradient animations
- 🔍 **Easy to Customize**: Well-organized code structure

## 🛠️ Technologies

- **Jekyll**: Static site generator
- **Liquid**: Templating language
- **HTML5 & CSS3**: Modern web standards
- **JavaScript**: Interactive features
- **GitHub Pages**: Free hosting
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Ruby (version 2.7 or higher)
- RubyGems
- GCC and Make

### Installing Ruby on macOS

```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby
brew install ruby

# Add Ruby to your PATH
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/shubhamkrshandilya/shubhamkrshandilya.github.io.git
cd shubhamkrshandilya.github.io
```

### 2. Install Dependencies

```bash
bundle install
```

### 3. Configure Your Site

Edit `_config.yml` with your information:

```yaml
title: Your Name
email: your.email@example.com
description: Your site description
url: "https://yourusername.github.io"
github_username: yourusername
linkedin_username: your-linkedin
twitter_username: your-twitter
```

### 4. Run Locally

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see your site!

## 🎨 Customization

### Updating Personal Information

1. **Homepage Hero Section**: Edit `index.html`
   - Update your name and tagline
   - Customize the typing effect phrases in `assets/js/main.js`

2. **About Section**: Modify the about content in `index.html`
   - Add your bio
   - Update skills in the skills grid

3. **Profile Image**: Replace the placeholder
   - Add your image to `assets/images/`
   - Update the image reference in the hero section

### Adding Projects

Create a new file in `_projects/` directory:

```markdown
---
title: Project Name
description: Brief description of your project
image: /assets/images/projects/project-name.jpg
tags: [React, Node.js, MongoDB]
github: https://github.com/username/repo
demo: https://demo-url.com
date: 2024-01-15
---

## Overview
Detailed description of your project...

## Features
- Feature 1
- Feature 2

## Technologies Used
- Technology 1
- Technology 2
```

### Writing Blog Posts

Create a new file in `_posts/` directory with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-11-27
author: Your Name
tags: [Jekyll, Tutorial]
---

Your blog content here...
```

### Styling

- **Colors**: Update CSS variables in `assets/css/main.css`
- **Fonts**: Change font imports in `_layouts/default.html`
- **Layout**: Modify section layouts in respective files

### Contact Form

Set up the contact form with [Formspree](https://formspree.io/):

1. Sign up for a free account
2. Create a new form
3. Replace `YOUR_FORM_ID` in `index.html` with your Formspree form ID:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 📦 Project Structure

```
portfolio/
├── _config.yml           # Site configuration
├── _includes/            # Reusable components
│   ├── navigation.html
│   └── footer.html
├── _layouts/             # Page layouts
│   ├── default.html
│   ├── post.html
│   └── project.html
├── _posts/               # Blog posts
├── _projects/            # Portfolio projects
├── assets/
│   ├── css/
│   │   └── main.css      # Main stylesheet
│   ├── js/
│   │   └── main.js       # JavaScript functionality
│   └── images/           # Images and graphics
├── index.html            # Homepage
├── blog.html             # Blog listing page
├── projects.html         # Projects listing page
├── Gemfile               # Ruby dependencies
└── README.md             # This file
```

## 🌐 Deployment to GitHub Pages

### Option 1: GitHub Actions (Recommended)

GitHub Pages will automatically build and deploy your site when you push to the main branch.

1. Go to your repository settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"
4. Push your changes:

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

Your site will be live at `https://yourusername.github.io`

### Option 2: Manual Build

If you prefer to build locally:

```bash
bundle exec jekyll build
```

The site will be generated in the `_site` directory.

## 🔧 Development Tips

### Live Reload

Jekyll includes live reload by default. Any changes you make will automatically refresh your browser.

### Draft Posts

Create drafts in `_drafts/` folder (without dates in filename):

```bash
bundle exec jekyll serve --drafts
```

### Future Posts

Posts with future dates won't be published until that date. To preview:

```bash
bundle exec jekyll serve --future
```

### Incremental Build

For faster builds during development:

```bash
bundle exec jekyll serve --incremental
```

## 🐛 Troubleshooting

### Bundle Install Fails

If you encounter permission errors:

```bash
bundle install --path vendor/bundle
```

### Port Already in Use

Specify a different port:

```bash
bundle exec jekyll serve --port 4001
```

### GitHub Pages Build Failing

- Check the Actions tab in your GitHub repository
- Ensure all required gems are in the `Gemfile`
- Verify `_config.yml` syntax is correct

## 📝 TODO / Ideas for Enhancement

- [ ] Add dark mode toggle
- [ ] Implement search functionality for blog
- [ ] Add comments system (Disqus/utterances)
- [ ] Create custom 404 page
- [ ] Add portfolio filtering by technology
- [ ] Implement progressive web app (PWA) features
- [ ] Add analytics (Google Analytics/Plausible)
- [ ] Create an RSS feed for the blog
- [ ] Add testimonials section
- [ ] Implement lazy loading for images

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shubhamkrshandilya/shubhamkrshandilya.github.io/issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Shubham Shandilya**

- GitHub: [@shubhamkrshandilya](https://github.com/shubhamkrshandilya)
- LinkedIn: [@shubhamkrshandilya](https://linkedin.com/in/shubhamkrshandilya)
- Twitter: [@shubhamisg8](https://twitter.com/shubhamisg8)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📚 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Markdown Guide](https://www.markdownguide.org/)

---

**Happy Coding! 🚀**

Built with ❤️ using Jekyll
