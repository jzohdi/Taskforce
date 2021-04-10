# Taskforce

Built on Django with rest framework and React for frontend, this project is a project centered todo/task web app.
![Home page](https://github.com/jzohdi/Taskforce/blob/master/images/home_page.png)
Features include:

-   Adding project and add team members to collaborate
-   Use different sections on the project to compartmentalize tasks.
-   Use Cards and tasks to organize checklist of todo
-   Due date on tasks will color the task to indicate time left.
    ![Project View](https://github.com/jzohdi/Taskforce/blob/master/images/project_main.png)
-   Check off tasks to indicate completion and add to the Card progress bar
-   Add sub tasks to group smaller checklists
    ![Check Off](https://github.com/jzohdi/Taskforce/blob/master/images/check_off.png)

## Contributing

Please open an issue, but otherwise help/suggestions are welcome!

## TODO

-   [x] Debug change project name
-   [x] Debug adding section
-   [ ] Add loading page
-   [ ] Use polling to update projects with collaborators
-   [ ] show user who posted in notes
-   [ ] clean up mobile UI
-   [ ] add favicon
-   [ ] OAuth
-   [ ] change password/delete account
-   [ ] Repeating tasks (task gets reset daily/weekly/etc.)
-   [ ] minimize bundle size

## License

This project is licensed under the ISC License - see the LICENSE.md file for details

## Acknowledgments

-   [@samouri](https://github.com/samouri) for advice and guidance.

## important commands during development

    install pipenv using powershell admin

    pipenv shell
    pipenv install django djangorestframework django-rest-knox
    django-admin startproject taskmanager
    manage.py startapp task
    manage.py makemigrations tasks
    manage.py migrate
    manage.py startapp frontend
    manage.py runserver
    manage.py shell - test DB and app methods

    manage.py collectstatic

    yarn run dev
