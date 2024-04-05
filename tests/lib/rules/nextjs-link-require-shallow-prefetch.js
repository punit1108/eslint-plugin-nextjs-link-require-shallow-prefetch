/**
 * @fileoverview Next.js Link tag will require Shallow and Prefetch attributes
 * @author Punit
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/nextjs-link-require-shallow-prefetch"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------


const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('nextjs-link-require-shallow-prefetch', rule, {
  valid: [
    {
      code: '<Link href="/about" prefetch={true} shallow={true}>About</Link>',
    },
    {
      code: '<Link href="/contact" prefetch shallow>Contact</Link>',
    },
    {
      code: '<Link href="/blog" prefetch={true} shallow>Blog</Link>',
    },
    {
      code: '<Link href="/blog" prefetch shallow={true}>Blog</Link>',
    }
  ],
  invalid: [
    {
      code: '<Link href="/about">About</Link>',
      errors: [
        {
          message: 'Next.js Link component should have prefetch and shallow attributes.',
        },
      ],
      output: '<Link prefetch shallow href="/about">About</Link>',
    },
    {
      code: '<Link href="/contact" prefetch={true}>Contact</Link>',
      errors: [
        {
          message: 'Next.js Link component should have prefetch and shallow attributes.',
        },
      ],
      output: '<Link shallow href="/contact" prefetch={true}>Contact</Link>',
    },
    {
      code: '<Link href="/blog" shallow={true}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component should have prefetch and shallow attributes.',
        },
      ],
      output: '<Link prefetch href="/blog" shallow={true}>Blog</Link>',
    },
    {
      code: '<Link href="/blog" shallow={false}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component shallow attribute should be true.',
        },
        {
          message: 'Next.js Link component should have prefetch and shallow attributes.',
        },
      ],
      output: '<Link prefetch href="/blog" shallow={true}>Blog</Link>',
    },
    {
      code: '<Link href="/blog" prefetch={false}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component prefetch attribute should be true.',
        },
        {
          message: 'Next.js Link component should have prefetch and shallow attributes.',
        },
      ],
      output: '<Link shallow href="/blog" prefetch={true}>Blog</Link>',
    },
    {
      code: '<Link href="/blog" prefetch={false} shallow={false}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component prefetch attribute should be true.',
        },
        {
          message: 'Next.js Link component shallow attribute should be true.',
        },
      ],
      output: '<Link href="/blog" prefetch={true} shallow={true}>Blog</Link>',
    },
    {
      code: '<Link href="/blog" prefetch={true} shallow={false}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component shallow attribute should be true.',
        }
      ],
      output: '<Link href="/blog" prefetch={true} shallow={true}>Blog</Link>',
    },
    {
      code: '<Link href="/blog" prefetch={false} shallow={true}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component prefetch attribute should be true.',
        }
      ],
      output: '<Link href="/blog" prefetch={true} shallow={true}>Blog</Link>',
    },
    {
      code: '<Link href="/blog" prefetch={"some random value"} shallow={false}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component prefetch attribute should be true.',
        },
        {
          message: 'Next.js Link component shallow attribute should be true.',
        },
      ],
      output: '<Link href="/blog" prefetch={true} shallow={true}>Blog</Link>',
    },
    {
      code: '<Link href="/blog" prefetch={false} shallow={"some random value"}>Blog</Link>',
      errors: [
        {
          message: 'Next.js Link component prefetch attribute should be true.',
        },
        {
          message: 'Next.js Link component shallow attribute should be true.',
        },
      ],
      output: '<Link href="/blog" prefetch={true} shallow={true}>Blog</Link>',
    }
  ],
});
