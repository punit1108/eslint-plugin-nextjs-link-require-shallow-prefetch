/**
 * @fileoverview Next.js Link tag will require Shallow and Prefetch attributes
 * @author Punit
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Next.js Link tag will require Shallow and Prefetch attributes",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name === "Link") {
          const hasPrefetchProp = node.attributes.some(attr => attr.name.name === "prefetch");
          const hasShallowProp = node.attributes.some(attr => attr.name.name === "shallow");

          // if hasPrefetchProp is true, get its value
          const prefetchValue = node.attributes.find(attr => attr.name.name === "prefetch")?.value;
          // if hasShallowProp is true, get its value
          const shallowValue = node.attributes.find(attr => attr.name.name === "shallow")?.value;

          if (hasPrefetchProp && prefetchValue?.type === "JSXExpressionContainer" && prefetchValue.expression.raw !== 'true') {
            context.report({
              node,
              message: "Next.js Link component prefetch attribute should be true.",
              fix: fixer => {
                return fixer.replaceTextRange(prefetchValue.expression.range, "true");
              },
            });
          }

          if (hasShallowProp && shallowValue?.type === "JSXExpressionContainer" && shallowValue.expression.raw !== 'true') {
            context.report({
              node,
              message: "Next.js Link component shallow attribute should be true.",
              fix: fixer => {
                return fixer.replaceTextRange(shallowValue.expression.range, "true");
              },
            });
          }

          if (!hasPrefetchProp || !hasShallowProp) {
            context.report({
              node,
              message: "Next.js Link component should have prefetch and shallow attributes.",
              fix: fixer => {
                const attributesToAdd = [];
                if (!hasPrefetchProp) {
                  attributesToAdd.push("prefetch");
                }
                if (!hasShallowProp) {
                  attributesToAdd.push("shallow");
                }

                const attributes = attributesToAdd.map(attr => ` ${attr}`);
                return fixer.insertTextAfter(node.name, attributes.join(""));
              },
            });
          }
        }
      },
    };
  },
};
