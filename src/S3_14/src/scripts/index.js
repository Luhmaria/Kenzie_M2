import { users, posts, suggestUsers } from "./database.js";

import {
  renderCurrentUser,
  renderSugestions,
  renderPosts,
  postingEvent,
} from "./render.js";

renderCurrentUser(users[0]);

renderSugestions(suggestUsers);

renderPosts(posts);

postingEvent();
