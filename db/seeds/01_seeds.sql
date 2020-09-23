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
insert into users (id, email, username, password, organization_id) values (1, 'vgoodlett0@craigslist.org', 'fstedman0', 'rzvRUP', 1);
insert into users (id, email, username, password, organization_id) values (2, 'gbutcher1@washingtonpost.com', 'dskoggins1', 'WznJCcK8r', 9);
insert into users (id, email, username, password, organization_id) values (3, 'jshimwall2@washington.edu', 'wjeaffreson2', 'XKlFa1gVmgB8', 7);
insert into users (id, email, username, password, organization_id) values (4, 'bmayow3@histats.com', 'vdargan3', 'HHgBoVEoA', 5);
insert into users (id, email, username, password, organization_id) values (5, 'gdriutti4@icio.us', 'rmulvenna4', 'AaIlBS4tq', 4);
insert into users (id, email, username, password, organization_id) values (6, 'fmcconnachie5@businessweek.com', 'mbolles5', 'nPFfZD', 2);
insert into users (id, email, username, password, organization_id) values (7, 'happs6@scientificamerican.com', 'dmcclenan6', 'noIPg7yXbRv', 10);
insert into users (id, email, username, password, organization_id) values (8, 'egee7@naver.com', 'kfozard7', 'PINjfsrqWLf', 7);
insert into users (id, email, username, password, organization_id) values (9, 'hnunesnabarro8@wufoo.com', 'rsapir8', '4z9Aq7p', 1);
insert into users (id, email, username, password, organization_id) values (10, 'cgreenside9@pcworld.com', 'fgimenez9', 'rhsg6zqYlB1', 5);
insert into users (id, email, username, password, organization_id) values (11, 'test@test.com', 'tester', '1245', 1);

-- categories fake data
insert into websites (id, user_id, url, password, loginName, category) values (1, 7, 'https://pbs.org', 'xzt8s9vyvIzm', 'imaseyk0', 'Job');
insert into websites (id, user_id, url, password, loginName, category) values (2, 11, 'https://sohu.com', 'gd27QlMtu', 'rperot1', 'Opela');
insert into websites (id, user_id, url, password, loginName, category) values (3, 6, 'http://t.co', 'B8ikqO1eKFi', 'chancox2', 'Stronghold');
insert into websites (id, user_id, url, password, loginName, category) values (4, 9, 'http://chronoengine.com', 'V9LyqUg7R', 'thinkes3', 'Bamity');
insert into websites (id, user_id, url, password, loginName, category) values (5, 11, 'http://oaic.gov.au', 'SfARIh9ckA', 'jdaintith4', 'Solarbreeze');
insert into websites (id, user_id, url, password, loginName, category) values (6, 6, 'http://sfgate.com', 'gTREk12GDdd5', 'mgoatcher5', 'Konklab');
insert into websites (id, user_id, url, password, loginName, category) values (7, 11, 'http://infoseek.co.jp', 'btnJ6O4I', 'ekett6', 'Trippledex');
insert into websites (id, user_id, url, password, loginName, category) values (8, 11, 'https://over-blog.com', '4ibJTCZdX', 'vthunderman7', 'Temp');
insert into websites (id, user_id, url, password, loginName, category) values (9, 7, 'https://creativecommons.org', 'yIlcLyLXF', 'fpye8', 'Konklux');
insert into websites (id, user_id, url, password, loginName, category) values (10, 6, 'https://nsw.gov.au', 'CXboMS0679x0', 'hcastenda9', 'Konklux');
