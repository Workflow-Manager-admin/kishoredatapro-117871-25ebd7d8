#!/bin/bash
cd /home/kavia/workspace/code-generation/kishoredatapro-117871-25ebd7d8/portfolio_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

