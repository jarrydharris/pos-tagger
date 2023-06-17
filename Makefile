test:
	@cd backend/src/tests && pytest

run-debug:
	@flask --app backend/src/api run --debug --reload