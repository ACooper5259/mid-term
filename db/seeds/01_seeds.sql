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
insert into users (id, username, password, organization_id, active) values (1, 'mzipsell0', 'mEughV6Mm', 5, true), (2, 'pbulfoy1', 'e0fe0Ng', 5, false), (3, 'sblew2', 'EPW0PGI3X', 9, false), (4, 'roxx3', '0Gl0JgnnnZe', 6, false), (5, 'zobreen4', 'aGcsoUAGwGHv', 4, false), (6, 'hbrahmer5', '4R1xHUUn', 8, true), (7, 'mniezen6', '6meXyzNBJt', 2, false), (8, 'arentoll7', 'wSYuub7', 4, true), (9, 'cayce8', 'e47rL1n', 9, false), (10, 'mpartleton9', 'fhUBrmUlU', 8, true);

-- categories fake data
Insert into categories (id, type) values (1, 'SNS'), (2, 'SNS'), (3, 'Shopping'), (4, 'Game'), (5, 'Work'), (6, 'Work'), (7, 'Streaming'), (8, 'Shopping'), (9, 'Quiz'), (10, 'School');

-- categories fake data
insert into websites (id, user_id, url, password, loginName, category_id, icon) values (1, 7, 'http://phpbb.com', 'xtzufPx6', 'jsherrott0', 9, 'http://dummyimage.com/50x50.jpg/cc0000/ffffff'), (2, 8, 'http://sfgate.com', 'JKSPRs', 'dcraddock1', 8, 'http://dummyimage.com/50x50.png/5fa2dd/ffffff'), (3, 8, 'https://patch.com', 'TwUp7fCUwi', 'hkennealy2', 3, 'http://dummyimage.com/50x50.jpg/5fa2dd/ffffff'), (4, 1, 'http://cpanel.net', 'Dxpv0rsAi', 'dsweeny3', 1, 'http://dummyimage.com/50x50.png/5fa2dd/ffffff'), (5, 3, 'https://fotki.com', '6J3tIH4QGrEQ', 'amarien4', 10, 'http://dummyimage.com/50x50.jpg/ff4444/ffffff'), (6, 8, 'http://gmpg.org', '3z8HoTo39', 'tmeineking5', 10, 'http://dummyimage.com/50x50.png/5fa2dd/ffffff'), (7, 10, 'https://chron.com', 'HqM1Ur6QRA5', 'abuddleigh6', 6, 'http://dummyimage.com/50x50.jpg/dddddd/000000'), (8, 6, 'https://blogtalkradio.com', 'xUw1CN', 'efrye7', 8, 'http://dummyimage.com/50x50.bmp/dddddd/000000'), (9, 6, 'http://apache.org', 'SqaaEKGz4WiV', 'astqueintain8', 5, 'http://dummyimage.com/50x50.bmp/dddddd/000000'), (10, 5, 'https://sciencedaily.com', 'PdrlKXzZonsO', 'dwhear9', 3, 'http://dummyimage.com/50x50.png/cc0000/ffffff');
