#!/bin/bash

SESSION="servers"


tmux new-session -d -s $SESSION


tmux send-keys -t $SESSION 'cd api-server && npm start' C-m


tmux split-window -v -t $SESSION
tmux send-keys -t $SESSION 'cd engine && npm start' C-m

tmux select-pane -t $SESSION:0.0
tmux split-window -h -t $SESSION
tmux send-keys -t $SESSION 'cd ws-server && npm start' C-m

tmux select-pane -t $SESSION:0.1
tmux split-window -h -t $SESSION
tmux send-keys -t $SESSION 'cd mm && npm start' C-m

tmux select-layout -t $SESSION tiled

tmux attach -t $SESSION
