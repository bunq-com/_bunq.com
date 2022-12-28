import csv
import requests
from bs4 import BeautifulSoup
url_base = "https://bunq.com"
url = "https://bunq.com/sitemap"
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, "html.parser")

WANTED_CLASS = "KILL"
with open('results.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    urls = []
    checked_pages = []
    for link in soup.find_all("a"):
        if str(link.get("href")).startswith("/") == True:
            page_link = link.get("href")
            if page_link not in checked_pages:
                print(page_link)
                checked_pages.append(str(page_link))
                reqs_new = requests.get(url_base + page_link)
                soup_new = BeautifulSoup(reqs_new.text, "html.parser")
                for result in soup_new.find_all(class_=WANTED_CLASS):
                    print(url_base + page_link)
                    writer.writerow([url_base + page_link])