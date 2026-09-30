# Postman Testing Notes

1. Start the server with `npm run dev`.
2. Run `GET all tasks` without x-api-key; it should return 200.
3. Run POST without x-api-key; it should return 401.
4. Run POST with x-api-key; it should return 201 and the created task.
5. Test PUT and DELETE with the x-api-key header.
6. Test GET/PUT/DELETE with a fake id such as 9999 to verify a 404 JSON response.

For the required practical screenshot, take a screenshot of the successful POST request showing the JSON body and response in Postman.
