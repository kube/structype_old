# Structype Internals

## GenericType

`GenericType` is the base Type Creator. All Types are constructed from a call to it.

It has multiple properties:

|                |                                     |
| -------------- | ----------------------------------- |
| `type`         | *Only statically available*. Current static type. Will be `null` at runtime.
| `kind`         | **String**. An identifier that permits to know what kind of Type Creator was called for creating current type.
| `literal`      | **Boolean.** True only if current type is composed ONLY of Literal Types. Can be a union or intersection of Literals.
| `black`        | **Boolean.**
| `union`        | **Boolean.**
| `intersection` | **Boolean.**
|


## Type Kinds

Type Kind results from (...)

- `Object`
- `Primitive`
- `Union`
- `Intersection`


