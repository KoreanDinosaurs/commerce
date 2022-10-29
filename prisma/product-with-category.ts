import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const SNEAKERS = [
  {
    name: 'Nike Dunk Low Retro Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMTA3MjhfMjIg/MDAxNjI3NDQxMDA1NjE5.HOgIYywGZaaBJDqUzx2OnX9HAxoOWPvuWHqUn_LZGcgg.VYIuOfA5_GgjBGRowv6dmQuAOPtUvmAxbGpOyUCOCtYg.PNG/p_9d8ed1a74d2540ab9842e63363607bf4.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Jordan 1 Mid Light Smoke Grey',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMDEwMjJfMjQx/MDAxNjAzMzMzOTcxMjA2.NLAl4nRfdAudviapGlPw9N5eTa9m5huHpltGWW6Hprcg.6ne1MDyc5kUpczjwkfQd6OlaUPPphxTCN_xjI29c2Bsg.PNG/p_23354_0_b7ec97887406476dad205d9fd6268b79.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: `Nike Air Force 1 '07 WB Flax`,
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA4MDFfMTIx/MDAxNjU5MzQwODMzMDc3.PzhWN_CoGllmWG7XgAaifLpEXzt6mI_koqrP43iaEUEg.ESuJOcRJB9Ox4pObNyTz2hv-isp0iuzHNGy-LAZy7esg.PNG/a_ad597a3bae0f4eaaada28e57b1ab6592.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike Dunk Low Retro Wolf Grey',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAyMDRfMjE1/MDAxNjQzOTQ3OTcwNDU3.Z5q_SKgBRvCWF17yUn2wOFraMrUnYUos8_DDv0J-U_gg.dDzwVnbHdYR5wdMRbyFgTfbeD_2gcFscXDoAsB4feBgg.PNG/a_4c45b1d00d3c4f97a28c40ecb106e566.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike Dunk Low Retro RPM Halloween',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMTEwMTRfNTIg/MDAxNjM0MjA1NzQ2NTYw.1QdEB-0rYUmxNkt8JD4XsIVknAaHUhQfM2nkMfPRw6Ig.1SUHYGfZc0S-K7_ls_OYEiWVKfeZVe6qgsuugyI2Clcg.PNG/a_39b383a25b8a4ab1aef1b18d3326f6e7.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike x Supreme Air Force 1 Low White',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAzMDdfMTMw/MDAxNjQ2NjM5MjMzNzM2.pELmvUZpCO9IHBnqPuT-MM_3KgRHEBM3PwKQITCziUwg.qa5jj2sXWiAyhwX4RP5m5ozoZinAf3yX8kSdf7UChDEg.PNG/a_1379738ed20947a8a52338c76436c3b8.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike Air Force 1 Low Gorge Green',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA5MDVfMTE0/MDAxNjYyMzYxNTYwNzAw.Puc-PEGd-FDGm2Np0JTpy95fw3J2U7-CM7zqsV-iQEsg.Le4FelJwsV2BYsNqh6gjg-MMbQu0w7nFMUdqUAiIHAYg.PNG/a_5c5e2c65de064188a8f27ae892427c38.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike x Supreme Air Force 1 Low Retro',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA3MjVfMTM3/MDAxNjU4NzE3MzI2NDQ4.xzJ5UoqdR12P8oewPbgYAVT7Agf2_TNWKhdkVLjjI_cg.UEKX5g5xpO3zNnrv_l-7SxBxZofgZZ1Ic_OBV70t8Nog.PNG/a_73bfa52d26ae4b559fd3a944c730a581.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike Air Force 1 Athletic Club Light Smoke Grey Marina',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAxMjdfNjcg/MDAxNjQzMjQ2NjY5Nzcw.ghscXDfPkcBApFG18fFJvVz_KQo42HEeHmK_03WvUuwg.x0eAFWLzW9T_X3fD0TqR200oJhetYCMWlHA2Ce-F7jgg.PNG/a_8423ee874fc6492ea27d28883f5288dc.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike Air Force Pojangmacha',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA5MzBfMTg2/MDAxNjY0NTE2OTAwODMy.mXuZ_m68TWKWHzOiCgD4cyX7b1py3aeHoAElpaEqNFMg.4Xe7rKD2e20Z13cE1bRgPMs3-ZLdfZycInpeEnTtBTQg.PNG/a_25ebdc7078c048eb8bd8ef64b62852e0.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike x Peaceminusone Air Force 1 Low Para-Noise 2.0',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Nike sneakers","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMDExMThfMjU2/MDAxNjA1NjkxMzExMTYz.leAiiIeRzdnBC6STAjmeqVlM0lokrpyt7EbsaWUtnnIg.hPz7sqovLq6tPmB6zs8PnR1q8UYkTl8YJiWGKm79cj0g.PNG/p_477d8861bbbd43e8aad3ee5d76c3df76.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
]

const T_SHIRT = [
  {
    name: 'AMI de Coeur Sweattshirt Black -22SS',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAxMDdfMjU3/MDAxNjQxNTQ4NTM2NTQ1.UZVu6eoyrBPUU4fOQwP2GvUpxNOfXGZR0ZPJVQKVRHAg.owC9ujldfcloga3ozUmQucoQ9SG1YjEQ7wctMdJBIxsg.JPEG/a_e1e8aec14f534c2f94d90fb9ffdb6013.jpg?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'IAB Studio Hoodie Black White',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA0MTJfMjY5/MDAxNjQ5NzM5Njc2MjEx.jV7UetF1oan-8z72cn7jaIv_5u74N6VG6BtpJQTtjPwg.ZdfmpVogCPmMX_gGHyiiBacu6M2V-iTymhqOGWhadgUg.JPEG/a_c293ecb64c984c469fd398657733b905.jpg?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Stussy Fuzzy Dice T-Shirt White ',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAyMDhfMjMw/MDAxNjQ0MzAyNjcwMjA1.6eiRuv9bvPQWO-WxTn5fzB1mQ6MHa6HV_BCT_ID_XKYg.AZSsjbfc-QbIoqKW_xead-um0Z6p8r3GZ2nM0Pz2J20g.PNG/a_821b33f548ab47ffb078ebfe677c326b.png?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Stussy Built Tough T-Shirt Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA3MjlfMjU3/MDAxNjU5MDYwNDI0NTY1.dju7WFCOD2RaLs7EMKtqPLMfvCK4syzJRKFZzZnhdzAg.MgNEU0OJ79Xva_stFb3Z5WxnP7BqHzGs2ym9U7KLufYg.JPEG/a_a251128436874c9a9dce57e1dfe2daea.jpg?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Peaceminusone Cotton T-Shirt #3 Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA1MjNfMTM4/MDAxNjUzMjg4ODg3MDM5.tF2X0UrMzW70nNm4ge_BoSVrqwo4-saxpFvHftcHu8cg.1ivG2u0Q4rRrR3jPkYfYWYzI74wiXajiJ0A6wugldlsg.JPEG/a_2bc2b146cc3c4b1ebbb14cc8db5d4e0d.jpg?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'IAB Studio T-Shirt White Navy -22FW',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA4MDFfMTUx/MDAxNjU5MzUxODIyNDky.D7b3JXHX21p6A7uM2DYwhBxyv7ogK7VT4q1jXqLc_Ckg.IL9NNOWy0rQW-HTHiI7EcSWnz0eHc5OtZGNhCX_SkM8g.JPEG/a_b0468529f5fa425ea92036ddf1cc5aaf.jpg?type=m_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Wooyoungmi Long Sleeve Black Back Logo T-Shirt White - 22SS',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA4MTlfMjU0/MDAxNjYwODkyOTQwNjcx.DFcspZfTttasTZ_rdXSjnzxgVWRX9mY8x9DfITAJNF0g.baLdNe1FWfauj_iiGejQXMjSb6_kRjw4Qb75YFlGSJkg.JPEG/a_1b6bc773bbd1439da7fa31a44a300f96.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Play Comme des Garcons LS T-Shirt Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMTA5MDdfNjEg/MDAxNjMwOTgzNTA4Mzk1.PH6ebU6qQF2txOkg8ajsDhFt2vFtS-4jYmhS_0GvtDIg.vvGqcWbo8W44IW3-aeC8X8l_VIc-hIgba2B9DZ7Zplog.JPEG/a_a70c0e58dcec4a378ab0dc1d0849177d.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Stussy World Tour LS T-Shirt White',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMTA3MDZfMjM5/MDAxNjI1NTU3ODk1NjI2.RHqHe6VdpvxJEHAWgnC2Da3FlgjTa5ZhbvwuR-2Y6I0g.Cnc_k5KpEf8AcZqFGgYdhJgf6Dofu6ktj-0CyjWTh58g.JPEG/p_d363a4e49ffd42e4ad21803e7a31d01f.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Vivienne Westwood Spray Orb T-Shirt Off White',
    contents: `{"blocks":[{"key":"67gub","text":"This is a T-Shirt","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA3MTFfMTU4/MDAxNjU3NTE1NTIwNzEy.4KoK30MYUNYhogH2AbIbPYc7njQlMoaMvo8A0M0qyQMg.FeGLiG7aYGUePd0ZHgaWKhDNqd_sNk7vQiVOP6dcGrog.JPEG/a_7165749fe84c44ec9a2844958729cab4.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
]

const PANTS = [
  {
    name: 'Nike x Stussy NRG RA Washed Fleece Pants Black (DN4030-010)',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA1MTZfMTEz/MDAxNjUyNjcxMzQ0Njg2.4vLdkg0_io8foUPdLiUJ1j6WN2bXPzdScinlHm09Ke4g.E4gxNo85HCDqCFqFMZq8V4XUShf1_-rdFv92ysJdH1og.JPEG/a_7c5bda8bd6784482b8bc59416a3fd06c.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike ACG Smith Summit Cargo Pants Black Summit White - Asia',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA1MjNfMTAx/MDAxNjUzMjkwNDkwMjIz.YXO7WaVUhTu9g9QYUOhuol57S-TYz3VDESdV-uEo4mkg.zhLvz2XVkBhDLe4dMRSTCf_h3usQGVYV1YTVWwKHSKMg.JPEG/a_961cb69910c94c8eb7c08ecb852913d8.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Essentials 1977 Relaxed Sweatpants Iron - 22SS',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA4MTBfMTU2/MDAxNjYwMTIzMzEyMTYw.rNb8WVRlbbXZVeGvTvARE1PK-bywPnM5Dtp0qN4xxdwg.AFaYNTm4Bvys07oIUw0wMzrwGZ-sedKj4kzJbcsglnIg.JPEG/a_5105aaf3e1714527bce4535a6c251aab.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Our Legacy Extended Third Cut Black Grey',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAyMjhfMTA0/MDAxNjQ2MDMzNTU0OTUy.xFyZzZgQQ1WlGdxl6t7WVM_iXceV74sIIkLODxl3iO8g.tl_Vf4nPNbr8maA1WIqtydgeBmmQYicV-0LBI1EcGpMg.PNG/a_0b1e74e0d33b47369c670f92703529a8.png?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Stussy Nyco Over Trousers Washed Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA4MTlfODMg/MDAxNjYwODgwNzIxMjgy.xBBxXKjFu73smW8mWHLRR0HZeFD_nM2IrZ3WabKSxIcg.fNErii5bvzEY7NreZiu4O1AXaaSrYKoYp6YlTE5zwckg.JPEG/a_c3092192b6c948d2ad8c6d220fde8c86.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Supreme Multi Type Jacquard Regular Jean Blue - 22FW',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA5MjdfNSAg/MDAxNjY0MjQ5MjcwNDgx.3Gn3eLiC3jPeLI2_3dhPje_o-pr4udwCLF7LkCh7g2Yg.yaH9veGqh0uCi5QP-6z7Q4dm55UYG34VO--pwg2yXMsg.JPEG/a_6bd7f6872ca84811a04c2329f79b3e3c.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike ACG Smith Summit Cargo Pants Medium Olive - Asia',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMTExMDNfMjUz/MDAxNjM1OTIyODMzNzc0.4XXdzEmIIOEVsjhruWwQHsNmvJuqoJBa_eXUPKEW9T4g.o89_iGjSG2FTqwawlcF1RRvJ10kIPOGkDYXgcUdbHZwg.JPEG/a_623e629e18b641ceb68e936c8d4f3a88.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Ader Error x Zara Patchwork Jeans Blue',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMTEyMDZfMjIy/MDAxNjM4NzgxMDM0NzQx.8a0801X3EqKDE8AaSInJKYAevpnyBt5BCShMI9aeahIg.Xz3ovXCJ4JCRCw_tsGpHNGsgCDFV3Bjua6YtIrH872wg.JPEG/a_cb7e21b13b07478197a49d910f865031.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Darkr8m Studio Basic Logo Sweatpants Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjEwMjFfMTQw/MDAxNjY2MzM1NTMxNDM2.wQ_y4Fu2W9TfMYbjKFSnyyo0POye4SSKfAaakISAtdEg.zyWqHHfv0C1LCXRqfI3T1x4dmVjmUjzR4vp8HwtJLYog.JPEG/a_a64708736ba24a048d86c21f599e6d1a.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'IAB Studio Sweatpants Oatmeal Burgundy',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Pants","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAzMjVfMTU4/MDAxNjQ4MTczODg3MTc1.hGXdXL5Uz5Xz1OtoeeCjd313wo6NskRfFtXmFQlpl8Eg.GJ6VCjf2mhR2ONBzmYQNlmpNxu9Y78qI9RUHRB7zANQg.JPEG/a_0767300522da4eb99aee79a14dd83c45.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
]

const CAP = [
  {
    name: 'Wooyoungmi White Embroidered Logo Ball Cap Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Cap","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA1MDJfMjI4/MDAxNjUxNDU2NDkwOTI4.GWKqSOJDIEpnm1eyCX7HRYGhnKdNntDQxdHun6MOG94g.Tjy62oXbFEbMrGXtetb0X-KhauoORUbHJBqpg8LylyUg.JPEG/a_c1c4526e512b40c6802deef1a2cf9c66.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Supreme x Nike ACG Denim 6-Panel Black - 22FW',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Cap","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA5MjBfMjU5/MDAxNjYzNjUxMjQ4MDA1.jeKdy6LnBqXYdo5CBlsP6hvGiSNfNozosYwOvf2iXaUg.k07FbvCUqooM2eFv4uDuZe-xP5OY5nLfbt9-QquNiV0g.JPEG/a_3503f0c874c34d30b57ea8909290e659.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Stone Island 99576 Nylon Metal 6-Panel Cap Black - 22SS',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Cap","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjAyMTRfMjAw/MDAxNjQ0ODI4MjE0MjEz.6doOs8x-g5SUtJ4dTN-YtA6NGVd1CeseCa3Hv9GOWDQg.VeYBFn48EeMABMDKIbPY_O9dZO7NyYGpC0QcqbFlMUIg.PNG/a_61a41a61a42c49fab423d705b358c91f.png?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Supreme Pigment Print S Logo 6-Panel Black - 22FW',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Cap","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA5MTRfMzgg/MDAxNjYzMTM4MzQ0MzY2.5Vf7ltMcMwVeCTSWPGmrvaNtPhU1t8HrzFk-69JzS8wg.LI99-xdO4qHZh3Zm3ToUBMLSxf0fHrWS6ub4v_SzZ1wg.JPEG/a_e54e72e97b5c4ab9b1affdea0de264ea.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Yeezy Gap Engineered By Balenciaga Flame Cap Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Cap","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA4MDRfMjg0/MDAxNjU5NTkyNDE2NDUx.8u6nomEIxuYGHsTQTIuJI-5A6uc0bnWL4ivI-xT8cpIg.0zoVbyZCIgJa902n8rmTIpMeqZlJ2u8D7Hzux0ntYJQg.JPEG/a_80d850e30626401d907038e57f5c0ed2.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
]

const HOODIE = [
  {
    name: 'Yeezy Gap Engineered By Balenciaga Dove Hoodie Black',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Hoodie","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA3MjZfMTE4/MDAxNjU4ODEzNTY2ODAx.yhAtxDonoaxKoWBIEn7GB_u4hSLGvDglSawbVWfQpbwg.jA3VG0stcj41KCIRoKIoalPA9tguZcTg3TDPodWUqb0g.JPEG/a_2e5ebd3c97aa4cfba8bfd95916d96626.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'Nike x Stussy NRG RA Pullover Hoodie Dark Grey Heather (DJ9488-063)',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Hoodie","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA1MTZfMjA3/MDAxNjUyNjcxMjcyNTcy.AO5rfBB9wfHmEVhd6mVJRljdrSWrSSAGElGVWqqKR2cg.neZLmxf9poOvVzwv5WF7BEZMGLE7hABfzxARJwtxSz4g.JPEG/a_b289e1ade93740ff926703bb7a25e150.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'IAB Studio Pigment Hoodie & Sack Coral',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Hoodie","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjEwMDdfNDIg/MDAxNjY1MTM1ODM5MTI3.SoKBLKbjKtaX-vi0BbA8NxX0kQyoExvdavg7-YmQ9GYg.LA1vhO7XQy1PL2NlMW1Q06j76liNyKDd6KdqLS3XCUwg.JPEG/a_4d6a9ad538ac4e3b8ad4d1ec4f115b1d.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
  {
    name: 'IAB Studio Pigment Hoodie Royal Blue - 22FW',
    contents: `{"blocks":[{"key":"67gub","text":"This is a Hoodie","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://kream-phinf.pstatic.net/MjAyMjA4MDFfMjQ3/MDAxNjU5MzUxNzgzNTA4.PeI7bmxEkWDaQHuB2jrviv9uoRWINO0MfgW-pJuiam0g.7ziP7Iqg1sXRUQw-xAxGAiLu0STqqBvMSplS75niGPwg.JPEG/a_1d5f97e24590485a9c2a7f463994a91b.jpg?type=l_webp',
    price: getRandom(100000, 400000),
  },
]

const productData: Prisma.productsCreateInput[] = [
  ...SNEAKERS,
  ...T_SHIRT,
  ...PANTS,
  ...CAP,
  ...HOODIE,
]

async function main() {
  await prisma.products.deleteMany({})
  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    })
    console.log(`Created id: ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })
