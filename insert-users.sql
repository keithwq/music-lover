-- Insert users
INSERT INTO "User" (id, email, password, name, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), '1@nji.cn', '$2b$10$SeyKQYqcfd67GiW18yvAzuBvkQg/7SFU8yTTnTwbTSqWs2zcS0X.K', 'User 1', NOW(), NOW()),
  (gen_random_uuid(), '2@nji.cn', '$2b$10$Yh6a5to4vSKVsw0ySGv6teBa9oZSf8JYVtPiAX0dOA7rxo3TteGZ6', 'User 2', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;
