import { LettaClient } from "@letta-ai/letta-client"

const LOCAL_TOKEN = 'your-local-token'
const BASE_URL = 'http://localhost:8283'

const client = new LettaClient({ token: LOCAL_TOKEN, baseUrl: BASE_URL });

export default client