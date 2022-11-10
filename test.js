import grpc from 'k6/net/grpc';
import {check, sleep} from 'k6';

const client = new grpc.Client();
client.load(['proto'], 'sort.proto');

export default () => {
  client.connect('0.0.0.0:8000', {
    plaintext: true,
  });
  // client.connect('bubble-rust-xmfhw3djgq-ew.a.run.app:443');
  // client.connect('bubble-node-xmfhw3djgq-ew.a.run.app:443');

  const response = client.invoke('sort.v1.SortService/BubbleSort', {
    data: [
      1302426640, 2072546305, 793232434, 1606108694, 1779760565, 1945300980, 228333096, 975915912, 1842649011,
      149893054, 620675971, 1058339877, 466474240, 1964118946, 1220347980, 1255964654, 363846191, 1276721190,
      1681155962, 1227327681, 1911827128, 1593141451, 747939078, 1588173400, 677961396, 144675836, 2015164336,
      658325679, 2113300292, 1547337997, 1699421320, 443779653, 1617841213, 1126541169, 773597466, 207678914,
      1310758872, 513750201, 2113154649, 1676973568, 734268779, 296650675, 1994948504, 363925989, 845593250, 1141209287,
      1953473027, 236615548, 1998501913, 1399062356, 358051682, 1134699018, 30402990, 759320030, 732511245, 1177655169,
      1976741935, 23091045, 1023447186, 732355887, 772033904, 703427928, 2049920250, 1480474135, 1354727908, 561319507,
      1047648158, 1944390104, 1786084231, 387273840, 968130441, 2021373100, 1010494715, 479794865, 602924038, 14455423,
      1293196507, 9579162, 1836961089, 1508842087, 971457818, 9640641, 1951622553, 1453077316, 302185057, 1492141112,
      421530791, 1886252386, 73876954, 63357167, 1057039728, 755479075, 1716966631, 1272259584, 1102848471, 381860665,
      572239082, 1760973751, 2041527397, 1255179190, 1774054324, 247072347, 1723684610, 770337163, 516389290,
      1840366780, 1654087202, 154993676, 12653270, 911261054, 903277062, 1374500772, 1300782162, 197044527, 1280959764,
      1181596162, 2133167337, 345459803, 1596839784, 1164402205, 951704901, 549908921, 1781225955, 11050900, 1885234996,
      2035997458, 1355874995, 1882779826, 2080686520, 1869886405, 1381387649, 1667271611, 1990853858, 1332163595,
      1020034313, 941607574, 733673822, 1080522663, 1764955397, 1876833164, 935711073, 1603845646, 317111797, 689919176,
      1742445495, 1836271430, 976305504, 873406406, 1353171388, 1067659445, 813226430, 448056362, 2122684839,
      1477283447, 228394326, 1245687870, 1080154639, 1815276236, 1937288893, 972284236, 2069789282, 589657794,
      2108446538, 339487637, 1761573634, 384044244, 419516366, 1127379865, 617289981, 1926504745, 947558364, 1236522501,
      1532405844, 152124215, 362434703, 518846212, 191965439, 449411614, 630685800, 1888171166, 1820429170, 597375102,
      1999695215, 1922442059, 1282355602, 1156581107, 1305349002, 1810139076, 744925460, 213747350, 1506855409,
      1951977537, 2096786593, 1861224651, 1797710833, 1159379073, 1612726106, 1652014220, 793409369, 986371823,
      703971704, 206894910, 874773538, 1082233841, 1208934264, 736627270, 1607007351, 490465233, 1745584213, 2060377375,
      1461991563, 1562142177, 1480980132, 1096902791, 1285211050, 1463725748, 60559664, 1877487733, 533224679,
      715878580, 953462042, 407935252, 1313575901, 1995734080, 1398718935, 795700501, 1800731437, 536719287, 287341514,
      1005418345, 651236375, 1134403516, 732483997, 424457954, 496979550, 408689464, 600073547, 510726219, 301727320,
      2007975151, 1509047934, 182385992, 143882935, 1646108607, 57983187, 686471058, 1218674117, 1126951494, 825554293,
      859046785, 2103340029, 1378651703, 886514742, 1689548035, 1990208332, 1282120636, 1848557992, 1270216915,
      950805049, 1070548889, 300177184, 1317799337, 933712849, 669694909, 971044946, 2114986943, 1234990620, 1632773036,
      1367815665, 181188980, 1343421718, 1350581, 1985133387, 1974614534, 729217616, 850773208, 1904927439, 1889387110,
      388277548, 1141523526, 562171621, 503551222, 1935198360, 419792360, 462167267, 146317844, 9242151, 1211220351,
      896373243, 1256692078, 1973809427, 1386867163, 353163619, 1957551717, 261095644, 123973880, 1419448760, 553023205,
      1952444415, 1673980526, 1693256166, 1243791001, 379171696, 270537881, 382783008, 1551387828, 1260487682, 74721062,
      1431692339, 1821963898, 1987043742, 1723307255, 924150351, 631019752, 1237199797, 838158779, 787907245,
      1561617283, 189357297, 43567785, 170638599, 671262785, 153891669, 1149698506, 555084154, 39962971, 1760958870,
      52944339, 1261678913, 23544978, 654854874, 1866325905, 1467482173, 1603974862, 1292780939, 1271461810, 422840127,
      407543701, 11878147, 74551353, 1940140781, 1162908772, 1627645359, 1685869695, 1026749552, 1790817383, 1533972505,
      716541238, 1921600517, 1782263907, 1641638642, 700377668, 635991514, 181672972, 1788418954, 1932294693,
      1579782286, 376230262, 1062115565, 1586216942, 75268811, 1692229755, 1239106642, 158454600, 1553721655, 443242142,
      1227143199, 233152445, 1482431032, 1015822545, 318553324, 1195335634, 1243533631, 1428823471, 1134980536,
      759986807, 1170246741, 694764419, 2144263717, 1234211133, 936627970, 1477533771, 337985783, 337182384, 1635112641,
      832450441, 195833270, 175747680, 655908069, 118242951, 1045637180, 13693043, 1764711086, 50502869, 619267229,
      795654928, 103627547, 1394452724, 86837664, 355308678, 763978106, 859014678, 607292532, 771965297, 1906983414,
      1653685625, 569609061, 1370915621, 1470838607, 1071636083, 779176587, 15901474, 1192647122, 173117083, 793545411,
      1928936878, 1215546666, 488627790, 1766332535, 833145995, 868686805, 861618018, 2131326206, 637612244, 2066876995,
      1317941030, 798894131, 1736063500, 675397568, 1389176635, 741853101, 1495906382, 1846831413, 823284491,
      1265985320, 11522037, 419941541, 1837773287, 302906060, 1044582531, 97058387, 2132602760, 2146485257, 2022137327,
      1179293825, 1841495205, 1184675033, 285669492, 1442373892, 1909949033, 318236525, 246096858, 2112322025,
      609735633, 859802580, 318882056, 1382116580, 2013206124, 70775107, 2103676956, 74441466, 112114687, 1319156888,
      1849448779, 1064853567, 838878662, 483022883, 759385862, 893190664, 357271066, 376046956, 1994616042, 816536735,
      2061183864, 1337013514, 1912178824, 1850472095, 1391472025, 313013340, 526297533, 1889741049, 600291736,
      1167639853, 2102495029, 1544397768, 1699062919, 551902515, 1076100618, 361266666, 1391149325, 489046452,
      1715515218, 2069078783, 1768726504, 7827492, 183205319, 1597075370, 1750970746, 1848984241, 112946945, 1077137744,
      1671074121, 1266717391, 1352813552, 1139649457, 521527832, 851934172, 1476182003, 591971724, 210399728,
      1507920107, 759318511, 1773876025, 743811537, 938594787, 1676854255, 201005943, 1670963781, 2013068094,
      2111175378, 1888722420, 1970463983, 485343537, 2120873006, 1916130592, 1614980823, 242272311, 1137577307,
      1632341849, 1074457796, 1188181710, 313391144, 1949386815, 2043930941, 1054390373, 231810197, 379925835,
      1779295458, 1956676111, 1989313231, 455001650, 185847501, 1773829362, 2044817461, 260462655, 113236449,
      1392015542, 1353247497, 2049118959, 292267639, 733533825, 247787368, 1500083959, 675166206, 198676212, 1280996574,
      1046266867, 1210882163, 843142279, 586000560, 1969616330, 1231902781, 1571016642, 644871524, 1554661198,
      480966604, 488263609, 1176902798, 395366553, 579823334, 706458173, 32439314, 1653736338, 1900114723, 1210966711,
      194009701, 1950227822, 1226578028, 939555849, 814828930, 2008376844, 1209081610, 424394573, 566313440, 685875744,
      363506744, 1469497557, 1447950120, 175268375, 1559162880, 453085851, 1591585329, 354976673, 463279520, 1176542352,
      1066926019, 413013442, 505915506, 1171704454, 448377986, 502556036, 497211445, 124649230, 2023860931, 432902603,
      121023692, 894493782, 969495830, 1141411728, 1580790855, 1336145578, 343123979, 1651521394, 165379327, 1051433897,
      131369569, 1001099781, 2117986435, 102793607, 2124419340, 1444947548, 1061939247, 1099125841, 731631274,
      1518103136, 961581712, 1572784764, 1381514604, 752836166, 1941247513, 421387404, 1446184056, 872825589, 81469389,
      252307071, 1714208219, 440619494, 1212818535, 153695926, 48223111, 1799611328, 878583483, 2069640775, 1264741384,
      621589016, 77289246, 2103196600, 276493779, 32445145, 109343278, 360581667, 1102796963, 1883672392, 1517274070,
      1784503680, 594022438, 1612215377, 2133742967, 1039434309, 219663775, 919474955, 1376395987, 810346664, 696678807,
      1048760142, 2060845530, 1072089846, 847742191, 288160312, 643657227, 446411099, 1716446644, 2040761097,
      1805222120, 1179044776, 1959494577, 550053412, 936961479, 594202728, 383215620, 2132037012, 298163183, 808621501,
      2079325363, 338615231, 1303029060, 552079090, 1538126445, 2091402766, 1824020630, 171550516, 651996800, 909978165,
      304532485, 1251677916, 1906127697, 271654230, 1512188022, 1874798922, 460491613, 1212890488, 1307641660,
      546342730, 849597119, 189629746, 372783199, 1272875692, 986465229, 1332892408, 1723255234, 1492424161, 1653105848,
      759325230, 445266602, 564627500, 1701652667, 1188352003, 9231174, 1690388548, 1697453313, 500785464, 1625406767,
      448675790, 1026106766, 368143204, 1839026057, 1894118928, 1930730715, 1997076457, 568330571, 953147355, 425895936,
      638732559, 901751829, 1233556659, 1785396523, 984414514, 1810922869, 1467059979, 1152206063, 637075819,
      1524191606, 252978656, 1797286013, 1020520881, 514177426, 194901075, 2048624861, 874322826, 332911035, 1755139485,
      2000994071, 1088708029, 1053685010, 1364764766, 915925169, 1409299046, 1280117853, 1975047899, 1602889676,
      1444783095, 969934944, 1767738892, 1991289163, 308175387, 804893077, 630975536, 773835592, 484402478, 1613172645,
      132526582, 784169618, 614887168, 1069623291, 1761015014, 451019931, 1517951056, 593172167, 1260988515, 1065885103,
      1383130188, 112971222, 368700546, 1656300771, 1247388281, 1237263810, 173142547, 1320149529, 1174525701,
      1202367645, 1073955202, 1260066712, 1705907164, 1631996319, 877002848, 1917607245, 2107326070, 503107108,
      414501617, 1441661600, 797940421, 2127196424, 1898778943, 888777333, 1227999001, 2126863877, 1165665508,
      369931099, 1318238779, 1089301808, 1266522249, 1790663617, 1908799391, 1981186265, 355336741, 1831943451,
      1934980885, 1409276058, 219922011, 1362849311, 485451137, 2050302318, 1836638998, 673864830, 649684423,
      1345372604, 381323968, 336682149, 1552601275, 444125605, 419962815, 934429033, 644797201, 1025520473, 2075959488,
      1212404253, 48214698, 1138188871, 968913137, 1637540662, 1657631604, 1682490317, 228732182, 96925912, 1526566308,
      1715521650, 45828220, 526247671, 26379320, 1717553136, 1347349358, 338590532, 1976413538, 2067919412, 925658738,
      1983761011, 1085538050, 17265263, 459155893, 1209890723, 261125305, 1288083989, 1872920665, 1204131784,
      1716702875, 1752645778, 2010096882, 1111339962, 52217453, 956198899, 1750356134, 388580750, 566882493, 202451573,
      1821671041, 1326626398, 1233104085, 1231814813, 1510175923, 339267598, 1730626641, 950140311, 1357782046,
      511730413, 1502410799, 2106016884, 710617628, 756251381, 1398093479, 596800955, 295741634, 879541516, 598061836,
      1899152845, 435959446, 1274308165, 658484458, 1865837831, 1102057490, 1700822423, 1328543868, 2029138500,
      657608737, 419289742, 254405473, 2021281758, 1568046931, 1409892065, 665180509, 230759932, 1569655279, 1083608609,
      940189257, 2134206222, 1783137114, 1051005015, 1916582220, 2045801577, 1130695312, 1227977702, 1516409759,
      135756342, 1985058887, 1240552814, 1494315468, 1716975852, 906754066, 1938061894, 1817309266, 1885872350,
      570535036, 1414758411, 1649550119, 1720853152, 978769276, 1162560306, 356760020, 774731515, 333679952, 2066480268,
      924030399, 413138089, 466458472, 433781044, 1102044806, 731272423, 445146849, 244843390, 1696783073, 114135,
      33238985, 53511173, 1947180268, 202033910, 2095172104, 2107493657, 264890141, 1264882033, 1351790119, 671945319,
      2054339076, 1396677633, 894266167, 1659801096, 427886136, 200539390, 310572801, 1982093789, 813967783, 1202304769,
      888048007, 1511208017, 824425663, 27947477, 747874871, 918058294, 17702454, 1238807036, 434175394, 1285479480,
      1529647899, 944958559, 1516281713, 1448132712, 208336640, 1933817170, 463666376, 2134800174, 1110036812,
      2037890695, 905795100, 2084254048, 1949875835, 94830363, 2019591187, 663093684, 762873060, 517772072, 1321707514,
      696426994,
    ],
  });

  check(response, {
    'status is OK': r => r && r.status === grpc.StatusOK,
  });

  client.close();
  sleep(0.1);
};
