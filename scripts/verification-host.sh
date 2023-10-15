touch ~/.ssh/known_hosts
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan -H $SERVER_IP >> ~/.ssh/known_hosts