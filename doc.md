# Doc

## Guilds
```json
{
    "owner": "<guild-owner>",
    "language": "<language>",
    "optimium": "<optimium-role>",
    "maxWarns": "<max-number-of-warnings>"
}
```

## Message
```json
{
    "message": "<message-id>",
    "type": "<assignement-type>",
    ...
}
```

## User
```json
{
    "warnsCount": "<number-of-warns>",
    "xp": "<xp-count>",
    "last": "<last-cookie-sent-date>",
    "cookies": "<cookies-count>"
}
```

#### Self assignable role
```json
{
    "emojis": {
        "<emoji-name>": "<role-id>"
    }
}
```

#### Pool
```json
{
    "emojis": {
        "<emoji-name>": "<proposal>"
    }
}
```

### Assignement types
* `0`: Reaction role
* `1`: Pool

### Languages
* `en`: English
* `fr`: French