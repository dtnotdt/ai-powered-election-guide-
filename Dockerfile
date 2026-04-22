FROM nginx:alpine

# Copy the HTML file to the Nginx web root
COPY . /usr/share/nginx/html/

# Copy the nginx template
COPY default.conf.template /etc/nginx/templates/

# Cloud Run sets the PORT environment variable (default is 8080)
# This will be substituted into the nginx config by the template
ENV PORT=8080
