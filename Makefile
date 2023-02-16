MAIN_BRANCH=main

cmt-%:
	git commit -m "${@:cmt-%=%}"

push:
	git push origin HEAD

pull:
	git checkout ${MAIN_BRANCH}
	git pull origin ${MAIN_BRANCH}

newb-%:
	git checkout -b ${@:newb-%=%}

delb-%:
	git branch -d ${@:delb-%=%}

fireDeployAll:
	yarn firebase deploy

fireDeployIndex:
	yarn firebase deploy --only firestore:indexes

fireDeployRules:
	yarn firebase deploy --only firestore:rules

fireDeployHost:
	yarn firebase deploy --only hosting

fireDeployStorage:
	yarn firebase deploy --only storage

fireDeployFunc:
	yarn firebase deploy --only functions

fireIndexGet:
	yarn firebase firestore:indexes

fireFuncList:
	yarn firebase functions:list