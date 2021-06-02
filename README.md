# commonform-smartify

replace ASCII punctuation with Unicode punctuation quotes in Common Forms

## Notes

Returns the modified form.

Returned values will _not_ be valid forms according to [commonform-validate](https://www.npmjs.com/package/commonform-validate) if any replacements were made.  Unicode quotation marks are not valid in strictly validated Common Form objects.

You may want to clone a form before smartifying: `var smartified = JSON.parse(JSON.stringify(form))`.

## Examples

```javascript
var smartify = require('commonform-smartify')
var assert = require('assert')

assert.deepStrictEqual(
  smartify({ content: ["The package's first test!"] }),
  { content: ['The package’s first test!'] }
  //                      ^
)
```

Quotation marks after uses, definitions, and references:

```javascript
assert.deepStrictEqual(
  smartify({ content: [{ use: 'Purchaser' }, "'s obligations"] }),
  { content: [{ use: 'Purchaser' }, '’s obligations'] }
  //                                 ^
)
```

Quotation marks after plurals:

```javascript
assert.deepStrictEqual(
  smartify({ content: ["affiliates' personnel"] }),
  { content: ['affiliates’ personnel'] }
  //                     ^
)
```

Multiple quotation marks in one string:

```javascript
assert.deepStrictEqual(
  smartify({ content: ["What's mine ain't yours."] }),
  { content: ['What’s mine ain’t yours.'] }
  //               ^          ^
)
```

Double quotes:

```javascript
assert.deepStrictEqual(
  smartify({ content: ['The product comes "as is".'] }),
  { content: ['The product comes “as is”.'] }
  //                             ^     ^
)

assert.deepStrictEqual(
  smartify({ content: ['such "moral rights" are included'] }),
  { content: ['such “moral rights” are included'] }
  //                ^            ^
)
```

Quotes in definitions and term uses:

```javascript
assert.deepStrictEqual(
  smartify({
    content: [
      { definition: "Purchaser's Name" },
      ' ',
      { use: "Purchaser's Name" }
    ]
  }),
  {
    content: [
      { definition: 'Purchaser’s Name' },
      //                      ^
      ' ',
      { use: 'Purchaser’s Name' }
      //               ^
    ]
  }
)
```

Three hyphens make an em-dash:

```javascript
assert.deepStrictEqual(
  smartify({
    content: [
      'What we mean---we really mean it---is this has to be on time.'
      //           ^                   ^
    ]
  }),
  {
    content: [
      'What we mean—we really mean it—is this has to be on time.'
      //           ^                 ^
    ]
  }
)
```

Two hyphens make an em-dash:

```javascript
assert.deepStrictEqual(
  smartify({
    content: [
      'July 3--4'
      //     ^
    ]
  }),
  {
    content: [
      'July 3–4'
      //     ^
    ]
  }
)
```

Three periods make an ellipsis:

```javascript
assert.deepStrictEqual(
  smartify({
    content: [
      'Who knows...?'
      //        ^
    ]
  }),
  {
    content: [
      'Who knows…?'
      //        ^
    ]
  }
)
```
Recurses the full form:

```javascript
assert.deepStrictEqual(
  smartify({
    content: [
      {
        heading: "Purchaser's Obligations",
        form: { content: ['First Child'] }
      },
      {
        form: { content: [{ reference: "Purchaser's Obligations" }] }
      }
    ]
  }),
  {
    content: [
      {
        heading: 'Purchaser’s Obligations',
        //                 ^
        form: { content: ['First Child'] }
      },
      {
        form: {
          content: [
            { reference: 'Purchaser’s Obligations' }
          //                       ^
          ]
        }
      }
    ]
  }
)
```

Leaves blanks alone:

```javascript
assert.deepStrictEqual(
  smartify({ content: [{ blank: '' }] }),
  { content: [{ blank: '' }] }
)
```

Headings:

```javascript
assert.deepStrictEqual(
  smartify({
    content: [
      {
        heading: "Here's a heading",
        form: {
          content: ["It's the first form."]
        }
      },
      {
        heading: "Here's another heading",
        form: {
          content: ["It's the second form."]
        }
      }
    ]
  }),
  {
    content: [
      {
        heading: 'Here’s a heading',
        //            ^
        form: {
          content: ['It’s the first form.']
          //           ^
        }
      },
      {
        heading: 'Here’s another heading',
        //            ^
        form: {
          content: ['It’s the second form.']
          //           ^
        }
      }
    ]
  }
)
```
