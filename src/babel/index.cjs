/**
 * Babel plugin for @floogic/ui token resolution with StyleX.
 *
 * Rewrites grouped token imports from '@floogic/ui/tokens' or '@floogic/ui'
 * to their respective granular '.stylex' subpaths before @stylexjs/babel-plugin runs.
 *
 * Example:
 *   import { colors, fonts } from '@floogic/ui/tokens';
 * transforms to:
 *   import { colors } from '@floogic/ui/tokens/colors.stylex';
 *   import { fonts } from '@floogic/ui/tokens/typography.stylex';
 */

const TOKEN_MODULE_MAP = {
  colors: '@floogic/ui/tokens/colors.stylex',
  darkTheme: '@floogic/ui/tokens/colors.stylex',
  lightTheme: '@floogic/ui/tokens/colors.stylex',
  fonts: '@floogic/ui/tokens/typography.stylex',
  fontSizes: '@floogic/ui/tokens/typography.stylex',
  fontWeights: '@floogic/ui/tokens/typography.stylex',
  lineHeights: '@floogic/ui/tokens/typography.stylex',
  letterSpacings: '@floogic/ui/tokens/typography.stylex',
  spacing: '@floogic/ui/tokens/spacing.stylex',
  shape: '@floogic/ui/tokens/shape.stylex',
  borders: '@floogic/ui/tokens/borders.stylex',
  elevation: '@floogic/ui/tokens/elevation.stylex',
  layout: '@floogic/ui/tokens/layout.stylex',
  durations: '@floogic/ui/tokens/motion.stylex',
  easings: '@floogic/ui/tokens/motion.stylex',
  breakpoints: '@floogic/ui/tokens/breakpoints.stylex',
};

module.exports = function floogicTokenTransformPlugin({ types: t }) {
  return {
    name: 'floogic-ui-token-transform',
    visitor: {
      Program: {
        enter(programPath) {
          programPath.traverse({
            ImportDeclaration(importPath) {
              const source = importPath.node.source.value;
              if (source !== '@floogic/ui/tokens' && source !== '@floogic/ui') {
                return;
              }

              const remainingSpecifiers = [];
              const targetImports = new Map();

              for (const specifier of importPath.node.specifiers) {
                if (t.isImportSpecifier(specifier)) {
                  const importedName =
                    specifier.imported.type === 'Identifier'
                      ? specifier.imported.name
                      : specifier.imported.value;
                  const localName = specifier.local.name;
                  const targetModule = TOKEN_MODULE_MAP[importedName];

                  if (targetModule) {
                    if (!targetImports.has(targetModule)) {
                      targetImports.set(targetModule, []);
                    }
                    targetImports.get(targetModule).push(
                      t.importSpecifier(t.identifier(localName), t.identifier(importedName))
                    );
                    continue;
                  }
                }
                remainingSpecifiers.push(specifier);
              }

              if (targetImports.size === 0) {
                return;
              }

              const newImportDeclarations = [];
              for (const [targetModule, specs] of targetImports.entries()) {
                newImportDeclarations.push(
                  t.importDeclaration(specs, t.stringLiteral(targetModule))
                );
              }

              if (remainingSpecifiers.length > 0) {
                importPath.node.specifiers = remainingSpecifiers;
                importPath.insertAfter(newImportDeclarations);
              } else {
                importPath.replaceWithMultiple(newImportDeclarations);
              }

              programPath.scope.crawl();
            }
          });
        }
      }
    }
  };
};

module.exports.TOKEN_MODULE_MAP = TOKEN_MODULE_MAP;
