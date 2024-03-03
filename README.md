# [transport-ticket-booking-api](https://github.com/belinda-g-freitas/mongodb-test-api)
A node.js API for the aatabase course exam.

### DOCUMENTATION
## REQUESTS
## AUTHOR
# Add author (POST) => body
- **name**: String (not empty),
- **nationality**: String (not empty),
- **birthday**: String of format "DD/MM/YYY",
- **books**: Array of String
# Delete author (DELETE)
- **id**: ObjetId (user)

## BOOK
# Add book (POST) => body
- **title**: String (not empty),
- **author**: Array of ObjectId,
- **description**: String (not empty),
- **genres**: Array of String (not empty),
- **publish_year**: Integer,
- **available_quantity**: Integer,



## LOAN
# Add loan (POST) => body