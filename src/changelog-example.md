## 16.13.1 (March 19, 2020)

### React DOM

* Fix bug in legacy mode Suspense where effect clean-up functions are not fired. This only affects users who use Suspense for data fetching in legacy mode, which is not technically supported. ([@acdlite](https://github.com/acdlite) in [#18238](https://github.com/facebook/react/pull/18238))
* Revert warning for cross-component updates that happen inside class render lifecycles (`componentWillReceiveProps`, `shouldComponentUpdate`, and so on). ([@gaearon](https://github.com/gaearon) in [#18330](https://github.com/facebook/react/pull/18330))

## 16.13.0 (February 26, 2020)

### React

* Warn when a string ref is used in a manner that's not amenable to a future codemod ([@lunaruan](https://github.com/lunaruan) in [#17864](https://github.com/facebook/react/pull/17864))
* Deprecate `React.createFactory()` ([@trueadm](https://github.com/trueadm) in [#17878](https://github.com/facebook/react/pull/17878))

### React DOM

* Warn when changes in `style` may cause an unexpected collision ([@sophiebits](https://github.com/sophiebits) in [#14181](https://github.com/facebook/react/pull/14181), [#18002](https://github.com/facebook/react/pull/18002))
* Warn when a function component is updated during another component's render phase ([@acdlite](https://github.com/acdlite) in [#17099](https://github.com/facebook/react/pull/17099))
* Deprecate `unstable_createPortal` ([@trueadm](https://github.com/trueadm) in [#17880](https://github.com/facebook/react/pull/17880))
* Fix `onMouseEnter` being fired on disabled buttons ([@AlfredoGJ](https://github.com/AlfredoGJ) in [#17675](https://github.com/facebook/react/pull/17675))
* Call `shouldComponentUpdate` twice when developing in `StrictMode` ([@bvaughn](https://github.com/bvaughn) in [#17942](https://github.com/facebook/react/pull/17942))
* Add `version` property to ReactDOM ([@ealush](https://github.com/ealush) in [#15780](https://github.com/facebook/react/pull/15780))
* Don't call `toString()` of `dangerouslySetInnerHTML` ([@sebmarkbage](https://github.com/sebmarkbage) in [#17773](https://github.com/facebook/react/pull/17773))
* Show component stacks in more warnings ([@gaearon](https://github.com/gaearon) in [#17922](https://github.com/facebook/react/pull/17922), [#17586](https://github.com/facebook/react/pull/17586))