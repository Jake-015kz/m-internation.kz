## Description: <br>
A11y Audit helps agents scan web codebases for WCAG 2.2 Level A and AA accessibility issues, propose framework-specific fixes, verify remediation, check color contrast, and produce compliance-oriented reports. <br>

This skill is ready for commercial/non-commercial use. <br>

## Publisher: <br>
[alirezarezvani](https://clawhub.ai/user/alirezarezvani) <br>

### License/Terms of Use: <br>
MIT-0 <br>


## Use Case: <br>
Developers and engineering teams use this skill to audit React, Next.js, Vue, Angular, Svelte, and plain HTML projects for accessibility issues, generate targeted code fixes, and prepare reports for accessibility and compliance review. <br>

### Deployment Geography for Use: <br>
Global <br>

## Known Risks and Mitigations: <br>
Risk: Agent-driven fix workflows can modify application code and may introduce unintended behavior even when the skill is benign. <br>
Mitigation: Review proposed diffs, use version control, and run the project's tests before accepting automated accessibility remediation. <br>
Risk: Automated accessibility scans and generated reports can miss context-dependent usability issues. <br>
Mitigation: Pair scanner output with manual keyboard, screen reader, and visual checks before treating results as final compliance evidence. <br>


## Reference(s): <br>
- [A11y Audit ClawHub Page](https://clawhub.ai/alirezarezvani/a11y-audit) <br>
- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/) <br>
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) <br>
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md) <br>
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) <br>
- [WCAG Quick Reference](references/wcag-quick-ref.md) <br>
- [Framework Accessibility Patterns](references/framework-a11y-patterns.md) <br>
- [CI/CD Integration](references/ci-cd-integration.md) <br>


## Skill Output: <br>
**Output Type(s):** [text, markdown, code, shell commands, configuration, guidance] <br>
**Output Format:** [Markdown reports, JSON scan results, command examples, and framework-specific code snippets or diffs] <br>
**Output Parameters:** [1D] <br>
**Other Properties Related to Output:** [May include severity classifications, WCAG criterion mappings, color contrast results, CI-compatible outputs, and remediation verification notes.] <br>

## Skill Version(s): <br>
1.0.0 (source: server release evidence) <br>

## Ethical Considerations: <br>
Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment. <br>
