-- Organizations fake data
insert into organizations (id, name, url) values (1, 'Tagtune', 'https://hugedomains.com');
insert into organizations (id, name, url) values (2, 'Thoughtsphere', 'http://webnode.com');
insert into organizations (id, name, url) values (3, 'Ooba', 'https://msn.com');
insert into organizations (id, name, url) values (4, 'Tagfeed', 'https://bandcamp.com');
insert into organizations (id, name, url) values (5, 'Blogtags', 'https://paypal.com');
insert into organizations (id, name, url) values (6, 'Vimbo', 'https://tumblr.com');
insert into organizations (id, name, url) values (7, 'Oodoo', 'https://deliciousdays.com');
insert into organizations (id, name, url) values (8, 'Pixope', 'http://msu.edu');
insert into organizations (id, name, url) values (9, 'Eayo', 'http://paginegialle.it');
insert into organizations (id, name, url) values (10, 'Bluejam', 'https://rakuten.co.jp');

-- users fake data
insert into users (id, email, username, password, organization_name) values (1, 'test@test.com', 'tester', '1245', 1);
insert into users (id, email, name, password, organization_name) values (2, 'ghartless1@google.com.au', 'Gregory Hartless', 'd2zzZnNf7W', 2);
insert into users (id, email, name, password, organization_name) values (3, 'mmarklin2@odnoklassniki.ru', 'Mohandas Marklin', 'kmbuoBqP', 3);
insert into users (id, email, name, password, organization_name) values (4, 'zstockin3@berkeley.edu', 'Zaria Stockin', 'zpmTQnSKp', 4);
insert into users (id, email, name, password, organization_name) values (5, 'gcliff4@vinaora.com', 'Gianni Cliff', 'YBmOuJlj9Y', 5);
insert into users (id, email, name, password, organization_name) values (6, 'dstarkey5@unicef.org', 'Daisy Starkey', 'KVRym7RRtOOw', 6);
insert into users (id, email, name, password, organization_name) values (7, 'kpeers6@twitter.com', 'Koren Peers', 'Wt7nbAQJoOXp', 7);
insert into users (id, email, name, password, organization_name) values (8, 'nhulett7@canalblog.com', 'Nisse Hulett', 'hRo4RAEo', 8);
insert into users (id, email, name, password, organization_name) values (9, 'cfennelow8@dell.com', 'Cory Fennelow', 'UAlI0Is', 9);
insert into users (id, email, name, password, organization_name) values (10, 'ejollye9@amazon.co.uk', 'Elsworth Jollye', 'YyyXJVpZoP', 10);

-- categories fake data
insert into websites (id, user_id, url, password, loginName, category) values (1, 5, 'http://rediff.com', 'ZCV4bp0e4', 'srollinson0', 'Y-find');
insert into websites (id, user_id, url, password, loginName, category) values (2, 10, 'http://cyberchimps.com', 'jRvWEPi65', 'cfitchett1', 'Zoolab');
insert into websites (id, user_id, url, password, loginName, category) values (3, 3, 'https://cpanel.net', 'UhffXkAKl', 'bscoggins2', 'Redhold');
insert into websites (id, user_id, url, password, loginName, category) values (4, 4, 'http://state.tx.us', 'V4SVIkioFS', 'fnesbeth3', 'Job');
insert into websites (id, user_id, url, password, loginName, category) values (5, 5, 'http://slashdot.org', 'dNBZqg6Vf', 'hedgley4', 'Bitwolf');
insert into websites (id, user_id, url, password, loginName, category) values (6, 4, 'https://chron.com', 'kOqUbPm', 'dsorrill5', 'Ventosanzap');
insert into websites (id, user_id, url, password, loginName, category) values (7, 5, 'https://java.com', 'H5iw3g', 'rmcnaughton6', 'Bitchip');
insert into websites (id, user_id, url, password, loginName, category) values (8, 1, 'https://bloomberg.com', '9zMKITicUl', 'ewhiteoak7', 'Tres-Zap');
insert into websites (id, user_id, url, password, loginName, category) values (9, 6, 'https://prlog.org', 'aZiW20', 'cwhate8', 'Matsoft');
insert into websites (id, user_id, url, password, loginName, category) values (10, 4, 'http://is.gd', 'DagpCmrKBhq', 'ycostell9', 'Domainer');
