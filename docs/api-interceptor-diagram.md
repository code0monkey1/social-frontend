# API Interceptor Sequence Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Interceptor
    participant RetryMap
    participant Server
    participant AuthStore

    Note over Client,AuthStore: Initial Request

    Client->>Interceptor: API Request
    Interceptor->>Server: Forward Request
    Server-->>Interceptor: 401 Error Response
    
    Note over Interceptor: Check Request ID
    Interceptor->>RetryMap: Check if Request Exists
    
    alt Request Not in RetryMap
        RetryMap-->>Interceptor: Request Not Found
        Interceptor->>RetryMap: Store Request ID
        Interceptor->>Server: Call Refresh Token
        Server-->>Interceptor: New Tokens
        
        Interceptor->>RetryMap: Clear Request ID
        Interceptor->>Server: Retry Original Request
        Server-->>Interceptor: Success Response
        Interceptor-->>Client: Return Response
    else Request in RetryMap
        RetryMap-->>Interceptor: Request Found
        Interceptor-->>Client: Reject Error
    end

    alt Refresh Token Fails
        Server-->>Interceptor: Refresh Failed
        Interceptor->>RetryMap: Clear Request ID
        Interceptor->>AuthStore: Logout User
        Interceptor-->>Client: Reject Error
    end
```

## Sequence Flow Explanation

1. **Initial Request**
   - Client makes API request
   - Interceptor forwards to server
   - Server returns 401 error

2. **Retry Check**
   - Interceptor checks RetryMap
   - If request exists → reject error
   - If request doesn't exist → proceed with refresh

3. **Token Refresh**
   - Store request in RetryMap
   - Call refresh token endpoint
   - Get new tokens from server

4. **Request Retry**
   - Clear request from RetryMap
   - Retry original request
   - Return response to client

5. **Error Handling**
   - If refresh fails:
     - Clear RetryMap
     - Logout user
     - Reject error

## Key Components

1. **Client**
   - Makes API requests
   - Receives responses/errors

2. **Interceptor**
   - Handles request/response flow
   - Manages token refresh
   - Controls retry logic

3. **RetryMap**
   - Tracks retried requests
   - Prevents duplicate retries

4. **Server**
   - Handles API requests
   - Manages authentication
   - Issues new tokens

5. **AuthStore**
   - Manages user state
   - Handles logout 