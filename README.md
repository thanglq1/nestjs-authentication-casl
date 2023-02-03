## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database

<p>Database design just for testing authentication and authorization</p>
<h4>Users</h4>
<img src="./screenshots/users-collections.png"/>
<h4>Roles</h4>
<img src="./screenshots/roles-collections.png"/>
<h4>featurePermissions field is array contains multiple object. Each object is one feature and permission</h4>
<img src="./screenshots/feautures-permissions.png"/>
<img src="./screenshots/permissions-of-each-feature.png"/>

## Mail Service

<p>After user signup. We'll send an email to user confirm</p>
<p>We are using node mailer, handlebars template and Amazon SES</p>
<p>Setup Amazon SES</p>
Go to SES => SMTP Setting create ses-smtp account to get username and password.
After create ses-smtp account success then go to SES => SMTP Setting to get host and port

## Endpoints

<h4>POST - Signup</h4>

`http://localhost:3000/api/auth/signup`

<p>Parameters</p>

```
{
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "123456"
}
```

<h4>PUT-Verify Email</h4>

`http://localhost:3000/api/users/verifyMail`

<p>Parameters</p>
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRoYW5nTFEiLCJzdWIiOiI2MzRhNzI3NDA5ZWVkMzBkN2NlZTg1OWIiLCJlbWFpbCI6InRoYW5nbHFAdGVyYWFyay5jb20iLCJpYXQiOjE2NjU4MjMzNDksImV4cCI6MTY2NjQyODE0OX0.knkeR0EMWbuzE9OFhPaFEaudo07YHdWEu5dBr1aPgj8"
}
```
<h4>POST - Create Role</h4>

`http://localhost:3000/api/roles`

<p>Parameters</p>
```
{
    "name": "Seller",
    "description": "This is Seller role"
}
```

<h4>PUT - Assign Features And Permissions To Role</h4>

`http://localhost:3000/api/roles/63254e0455b58996340b4b44/assignFeaturePermissionToRole`

<p>Parameters</p>
```
{
    "featurePermissions": [
        {
            "feature": "INVOICE",
            "permissions": ["READ"]
        },
        {
            "feature": "ORDER",
            "permissions": ["CREATE", "READ", "UPDATE"]
        }
    ]
}
```

<h4>PUT - Assign Role To User</h4>

`http://localhost:3000/api/users/assignRoleToUser`

<p>Parameters</p>
```
{
    "roleId":"63254e0455b58996340b4b44",
    "userId": "63254dd955b58996340b4b3f"
}
```

## Authorization

We have 2 ways authorization

1. Use decorator CheckPermission and AuthzGuard

```
  @Post()
  @UseGuards(AuthzGuard)
  @CheckPermission([PermissionsType.CREATE, FeaturesType.ORDER])
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user) {
    return this.ordersService.createOrder(createOrderDto);
  }
```

2. Use caslAbilityFactory

```
  @Post()
  @UseGuards(AuthzGuard)
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user) {
    const ability = await this.caslAbilityFactory.createForUser(user.sub);
    if (ability.can(PermissionsType.CREATE, FeaturesType.ORDER)) {
      return this.ordersService.createOrder(createOrderDto);
    }
    throw new CustomForbiddenException();
  }
```
