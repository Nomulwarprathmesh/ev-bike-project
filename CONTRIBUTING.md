# Contributing to EV Marketplace Platform

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup Development Environment

1. **Clone the repository**
```bash
git clone https://github.com/your-org/ev-marketplace.git
cd ev-marketplace
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment files**
```bash
# Copy example env files
cp ev-admin/.env.example ev-admin/.env.local
cp ev-marketplace/.env.example ev-marketplace/.env.local
cp ev-vender/.env.example ev-vender/.env.local
```

4. **Start development servers**
```bash
npm run dev
```

## 📁 Project Structure

```
ev-bike-project/
├── ev-admin/              # Admin application
├── ev-marketplace/        # Customer marketplace
├── ev-vender/             # Vendor portal
└── shared/                # Shared packages
    ├── ui/               # UI components
    ├── hooks/            # React hooks
    ├── utils/            # Utilities
    ├── types/            # TypeScript types
    └── constants/        # Constants
```

## 🔧 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### 2. Make Your Changes

#### Code Style
- Use TypeScript for all new code
- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

#### Component Guidelines
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components under 200 lines
- Use TypeScript interfaces for props
- Add JSDoc comments for complex components

#### Example Component
```typescript
interface ButtonProps {
  /** Button text */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary';
  /** Click handler */
  onClick?: () => void;
}

/**
 * Reusable button component
 */
export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Run type check
npm run type-check

# Test in development
npm run dev

# Build for production
npm run build
```

### 4. Commit Your Changes

#### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

#### Examples
```bash
git commit -m "feat(admin): add bike filtering"
git commit -m "fix(marketplace): resolve cart calculation bug"
git commit -m "docs: update README with setup instructions"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Pull Request Guidelines

### PR Title Format
```
[Type] Brief description
```

Examples:
- `[Feature] Add bike filtering to admin dashboard`
- `[Fix] Resolve cart calculation bug`
- `[Docs] Update contributing guide`

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests passing

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

## 🧪 Testing

### Manual Testing
1. Test in all affected apps
2. Test on different screen sizes
3. Test edge cases
4. Test error scenarios

### Automated Testing (when implemented)
```bash
npm test
npm run test:coverage
```

## 📚 Documentation

### Update Documentation When:
- Adding new features
- Changing APIs
- Modifying configuration
- Adding dependencies

### Documentation Locations
- `README.md` - Project overview
- `docs/` - Detailed documentation
- Component JSDoc - Component documentation
- Inline comments - Complex logic

## 🎨 Code Style

### TypeScript
- Use strict mode
- Define interfaces for all props
- Avoid `any` type
- Use type inference when possible

### React
- Use functional components
- Use hooks for state and effects
- Extract custom hooks for reusable logic
- Keep components pure when possible

### CSS/Tailwind
- Use Tailwind utility classes
- Create custom classes for repeated patterns
- Use `cn()` utility for conditional classes
- Follow mobile-first approach

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `PascalCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

## 🔍 Code Review Process

### As a Reviewer
- Be constructive and respectful
- Explain reasoning for suggestions
- Approve when ready
- Request changes if needed

### As an Author
- Respond to all comments
- Make requested changes
- Ask for clarification if needed
- Thank reviewers

## 🐛 Reporting Bugs

### Bug Report Template
```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- App: [e.g., ev-admin]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches considered

**Additional Context**
Any other information
```

## 📦 Adding Dependencies

### Before Adding a Dependency
1. Check if functionality exists in project
2. Evaluate package size and maintenance
3. Check for security vulnerabilities
4. Discuss with team if major dependency

### Adding a Dependency
```bash
# Add to specific app
npm install package-name --workspace=ev-admin

# Add to shared package
npm install package-name --workspace=@ev-marketplace/utils
```

## 🚀 Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Test thoroughly
5. Merge to main
6. Tag release
7. Deploy to production

## 📞 Getting Help

- **Questions:** Open a discussion on GitHub
- **Bugs:** Create an issue
- **Chat:** Join our Slack channel
- **Email:** dev@evmarketplace.com

## 🙏 Thank You!

Your contributions make this project better. We appreciate your time and effort!

---

**Happy Coding! 🚗⚡**
