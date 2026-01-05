"use client";

import { useState } from "react";
import Image from "next/image";

const tutors = [
  {
    id: 1,
    name: "Teacher Festi",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkc6Sf7zzMAYF2DRi-hMiPu5Uh5NcWnusd1d-nh-H35Jk4drNRW94akrd6lA_Q5mfDYS6jAjwmxqwd2mMdGvgHOMCjZYgdHUpoKyOo4s2R56Egi9e7D8slNPISSyjo2R7TpShNUzxGPAsjCcibC4jWN99T6s22uIYjaplnGjt6gmxvH2x1zyMMJVVsoHtGzkLWvgaZQeWT4dl4CYMr4cl-MOlIleQzAVNh4nG-w=w1280",
    niche: "Kids | IELTS | Business",
  },
  {
    id: 2,
    name: "Teacher Rachael",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeIQXJbYk7BFwKgSiYHmfsF7RPWD8ErvVT0ZKgdhCH69G82tLxAe7CSiGnWPlXbC_CyYJKtyB0njGDdHJbQviFReN8geBxwsqzrJqO72MzH-xavP4Yqbt_HZvRAZ5v6w1IcMD7asMbKClCJmYK6OnD8oJzdWrWcZUFmsOH3ZsWft7NTXm0_qTn5JvvbCaDvWVK7HPSZRCHVqjtMnfxd-cN5vMyQoFJTgSIetKQ=w1280",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 3,
    name: "Teacher Zayy",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeGldmKUgUJpq14hi8g8lrWnNGNWg--eiL0D4VcEcoU0G15EPwl5xJYX6asjQY5U49thYjl1c0AFWPGsYWIgB9FNwIvVqDsXxeY7Rz25j34P2KY2Bb2Sb0NLKrughB-ooOroEKQN9GC8hbTEpcpzzkCLSZ6nOXBjhvwJv7dYb8Jet8qJeJJQC5BYTcI6Gd6lEQme6sacOMifMA1H-rPBnrSuwE-4XmILScN89A=w1280",
    niche: "Kids | General English",
  },
  {
    id: 4,
    name: "Teacher Bee",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcqPDpju39GunIEadiOJX8QraEgml1bCXsbV_CEqnvm8d8cBrsXVvqaQm0ZH-6uja4GQe-RKDVGWa0yt3__LZMVCRCUh8SBvGEp3mYXh-g225YzCdseN81sYx4KZzLwFIma9LQJOf8jCrlerOzYOux_VGLzCNEz_fVZ8ozHjECGykqiAhyAQJLY3bwm5KzjOt4ktQKzj4GfNJ3AP8pzNJ7wd4wv2ZMYQ48DHVA=w1280",
    niche: "Kids | IELTS | Business",
  },
  {
    id: 5,
    name: "Teacher Ruth",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkfwomH8tMDSpf-1sPvYDpbYeEstzJXi0tnxld2bVzaEWhBikUwRxBZPmWmRtBBoEiuMuGIJ2ASsDd0dTR803q40pC0KGbQGDXjj3_kXW0B-gAqC2EzYYr_0GwkhwceQgCY0Rq0dcdcjoXFU0EfdvaP6mN__7A_97QSWYP673caoRhbtu4RDYn9bVB6TVhx3nDiVnWU6ZTlACwCFm4_m9nR9LonWahIF36xS=w1280",
    niche: "Kids | Phonics",
  },
  {
    id: 6,
    name: "Teacher Mary",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeUMWe2RTqQ7zSPpJrdvzXOdJ2iDeSS5--FPCpuOAGKNRqUILDOXNXtXIllaGzJvYkWHA205eIbNlA3hSRlzbqznYfUSQHy2OhcLTAQJIasIaymK1MrPt9M1a6AVGvxs1Z_JHZjTJgRJLfC2BGRAGtQ75yMmHLEgy3m0OwtxjDmeBtnizww0R5lSpoXAZa0stcpyEOH4bGrB6it2RLIXv_KMBh2gYJ9gpVT=w1280",
    niche: "Kids | Conversational",
  },
  {
    id: 7,
    name: "Teacher Lilian",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcLj57Zw1GhNQkDk_DjegIHFShKOvk7NdEPxnjYr6H7ORFVW-jFA3FNyuC2Vk6oAEGOlix6A6hqjultRSv_dh07YNgLdhqy094PQYa5z_dVOKNESEG_9OR5HxTG7ot_vhRt1YOPSJfZ3SZsxFOA0PMgEqmO_rwPzTK_22yNyN3z3G_53dWqHiX6oLo=w1280",
    niche: "Kids | Phonics | Business",
  },
  {
    id: 8,
    name: "Teacher Rosie",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeLJnEbiJVCJ977ALTv-IpTS9unRO2D0OuKqhbx-NUt7JFNu6W2zI-EVplFCJx6FY-6BkEF5t5q6aQRxzrBP1uDOuvnZzQN7Qy4TDORyCMhvFXG2QpbPzEN1jkEW2_Dg0DPmHcdfxgRjLSCdMFYrUFob1XFvIAZpnNBT0BjdV3lv43UDjfipw3rDHg=w1280",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 9,
    name: "Teacher Lovelyn",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkdRn7DQcFdTRW-eJaohF_qujBvCVhyL3os4TzVRCagMn4UFmDFyEX80glPa58ZcGLFH03IqDb67F114kxkWoNa5qd_3n_VLURAhXJRIAx2Yoh1LqsSn5BbpAw74E77cqz32FZFjzmFWXUe-ma7M8ZTCqynC0J-uJjo2nxlQpKyX_0oP85gfDsBgb2Q=w1280",
    niche: "Kids | Phonics",
  },
  {
    id: 10,
    name: "Teacher Rich",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeQxV9VrEW4K7pNQ-Thv7ihif4kDeubuH81hVNNVCYeP7aFLKi9VlZh8EYJTf_chKffaJmZAmO3tQ7Nz3Qkwi2q_Jc9x_lQQFxi0iCsYKKY-VwK6ijNCSfMlmWlXqvszICYwPA3YkYFDOMo3R-2hZr0_ZJDJxpGIR7KsOn-y1oW8I4JlUEwsoBM2ldGnV1-kIR4D1jfku5KfTaqgu4LUXM1gU-Nw1hRecTXhR0=w1280",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 11,
    name: "Teacher Esther",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkfsBOBaXPv2pQZXR0IaQgFgvo4oZImN-w9s3R3zmnMjV4WQ3a2l_jlGnHRdyXOK1OSv-KVWNNlWBTLud6_Tq6rkh7xa8-Len_E5Y9Vk97WAqaQ0OGxDoMcajf5kPUdw8gl6Z_N61mQ_IpF_vQOK_OIOTE5WUuV76lOz_2wxHi2Hu5ebD1nnjnNtk8CFGCUyN_xv903QQukyOgpRuw7zRwbDYunaObQrCAk0=w1280",
    niche: "Kids | Medical English",
  },
  {
    id: 12,
    name: "Teacher Annie",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeDxBhgJpA2M8Fm2IfYnI1FRCDdTt48pZu1DGVwOBjR8WMvzVr5iVjZBJWTUgm1jHT4cs41p7Drq_wtfcHxYC2iJo8CrnXlzqG2u-AlsFd3-a996vlM1Y8HDU2W8hts_9w_941MMaJlh632WtHuSD2eXJfQtNY-fs5rtXIMi6V5dN3byHhmUORIfpApRqwtroPvT1cG-wSGSlpBAdiCs9k6ZJ4dDupmCRr-MnM=w1280",
    niche: "Kids | French | Phonics",
  },
  {
    id: 13,
    name: "Teacher Fyne",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkefT2JEK60Q8HgSD6BdC45-ahrlCICLs1QuZ4dvJSQtCJQAwMwRmbVZwcO9zb8XDHnyq7r4PSNiq7pZu36s3g1ifymY4lc58Iw-WTfGKSoSNePPC-bmD6DaByI0N0brzspRTw-ajbxxL0-bF9jXg9BiVJw373CWRx313dNdGzVsDYL9EmvaY5tHl5WKhvajhEIMsxB1NO7cAORzmYid3vjZoNUc3Ai5XM8JoIM=w1280",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 14,
    name: "Teacher Enchy",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkdJBBt02bxjWISgT0vHAeY2QdL2S49nMVCdQsr9tS4nnrNkBuEsZB-qb23WC4h65YLHBk20QOyLWdEe1W3tLJihUFq24oqMcpcEZLWsdi1QwsndHLAvGF7TDOrHLaa2p9s0X8igOpzZTzyd9_KCWjbTtVtJRhue0ohqHO86e_c6XP0AruUaRbA_hGtgOREELcbY4oq4XRLiqYfpiRlO4vcSkE2YdWni39I0T38=w1280",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 15,
    name: "Teacher Eli",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkfVoHkF-VPff_1uTpEZH77mLUpsCi9ljxyGLRyocgeRxMkOGvaPt8W6-Prs_JslVX7V4s7Mfkh-Hmym4cba6CT3SlFrR-63H2fFX29D1F-TtbAJSW_oFQl_LQ3EJhen0-VVQ94C04IRYHsqcOMFqipz74g2R4YnpIwWZ_Oa_Sl_87peevrnlNRGxyb2nw9MIHN5-YIpCAY1KgsvcNxjOZuKtRcfHfnL_8fuyks=w1280",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 16,
    name: "Teacher Bibi",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkf-uJkflZQGKi3PipqDBwMYeTC0niO3kwNqfl8Mzu0pFjo4Gj4cEjpoT6gFo5YDJeYPYalvbC8FKdyu4tfCqr_Oi39bxdt_mNRkyUfNG-hY65Mis8tEPBwBPRRgq0gknTvGmffmysDGiOUgDIgy4evgncf2OUj9EvHEmOTqVBvk6KTuGjJP8fBllaiLgdSJy01zRdr8urwHx6z80r0JdGlg4GLlTIt_dMXURH0=w1280",
    niche: "Kids | Conversational",
  },
  {
    id: 17,
    name: "Teacher Jessica",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcgowMu58K7IkYBrgSpiQHxT4fbpAb8xJONLVV75Qm7eLwyUcKh5J5g-HbQOgathEB8OFStM1i9Iu4GtF0bM1vql4C5of8EsL-1MOCP8J92oRpO29G5kJOuCpih8tSA-MQ1EsGG0aMkLCPcrX2PMTiLCGLqoBZ5eNhB_91cOZqewETam_1Hq9xxQdUBgBuzhzF-weL89Vfe7pYtM3kOyqaSI-QZrWsojw=w1280",
    niche: "Kids | IELTS | Business",
  },
  {
    id: 18,
    name: "Teacher Praise",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcarcj1LoIStK0o7jZy_ZHODvSHuHxGyjy2O3rvBPLJ-dYqLSsoE_Qk0b_bNtG7q5lVnnBhP860uKS1xQaoM4XqZ7PEmqHYp70NiWwGTBaJ_0oOcNqC_EBRPxlhdJKZFnDVqduMO5B-VUjVYZtovrLa9pAMeLxpY3m_UKVnG3zTTE4MycGR1JXNnav21cRPFiCsi5VeAJrjsFh1lf9pdBeuTmfmzRkQq3q-=w1280",
    niche: "Kids | Phonics | Grammar",
  },
  {
    id: 19,
    name: "Teacher Nika",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCke5niye6xQCggE5ZChdMPx0vLzlMO3uAF4oFBVHISMJhryJnvTSMkLX0kYIp22GqFqpLwlcK_2_IwmUFvlYb2imqP1Po8iUN1uTj0-NshVK9nSJ0wuXhKoQiF6epLbhTBIfkvSC-VKN7kNS66EgNstppSg3_TRn8K8SU6kOYH63P9X95U5nT6lFy9A=w1280",
    niche: "Kids | Business | Academic",
  },
  {
    id: 20,
    name: "Teacher Gika",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkccLSCNM-eIbWsGPuqUpWHkI9Ma6TiPBliQb5HPYplcEmVVglv-m5XF4xeOHkVPUahBEQXQbI6v9f5mgwLUHG7Oa5oVV-BR-IMGGF5xog3SEfFqLXHDdELYfVV3Dds3QOIipnRFQ2ybc2jOWsewqKhJPJM84b5mg1W3eZfOm4IBi20gXe-kWenJECfm2IScPfknc_buXh3Q_qrvYumQ2kvHL96YXG749cEs=w1280",
    niche: "Kids | Phonics | Conversational",
  },
  {
    id: 21,
    name: "Teacher Faith",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkd-Z_Sinlp5y9b4WOLIE7bQwofSwj6DYzTq8oaHp3NOAx8vgfoUEnRoMF16mWCaFU8OpFcjymfYR1zeiHqQzKv7OO-EYds9o1F_DF2RAaKpLC9cLzE74C_rDeF0V6M5SCCD57o5y8AAPxcvN0YmSh3fViTrdodmwXxn163xSgqZLxSS0s-fpmD20qJkKwVCi1z-lN-7GYzh4KtRv3AprBTDoNt-Pwhh8w81=w1280",
    niche: "Kids | Conversational",
  },
  {
    id: 22,
    name: "Teacher Alice",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeRD1vXoPovv7R5frg0WR1hlu-oV59uFKpXUS_jZrl2P8OlAPUHjxnrcvyraiwVCzR54ubQJ6Kk_wFWmu_I1WbgXo4MkLCuWpFWW_IRb-k7wy8EG22Klyrz8nrRW4wSPDeeQJcaMzR4ZFmQwVQsLslslia7rh5odh9am31fqGJuphPT_-bp80I1WmQdKNPJo6y_F89atcpfH4I6TZ4ozu6XfbYOU-su4_aJjPg=w1280",
    niche: "Kids | Academic English",
  },
  {
    id: 23,
    name: "Teacher Nnenne",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeQ8OEVtmpRF-R3gOCsfwU8aq_BUjOuUbp2dbvSlACc8nc-NVQgxlFGVJprqGSVKCFcgR7bPgtTrakwJkoWNXxuWi7buxoEXEuTPhN4F4CHV3PGhh_ZKkFyr45yPDPbDPxoheO2ExfSBF0772QOpPSds9JYQ024gPKUQJxf715sHxghDNENgfVZ0Ez9ud6_QWVBItOe-fKzZe5ALD3E98XBjPCu5M2u5Ryu6Eo=w1280",
    niche: "Kids | Phonics | PET",
  },
  {
    id: 24,
    name: "Teacher Miracle",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcy07yEUqgo-DVaQ2TGZY573OQyd2hlklDYAbqgByPeD_UplIQPC4MLhmLzzAkfttCV6ALLCZVB-XOt2YBV5kgLCHPtw0SxBGHmHpxJy5A1N_H20BKraKMvNomEbkcdt65FXNAGeFnjo_LrNrLMRSH2uJ7CUe78FfECYEwjtuZmvdDjYPwxI4MZH-kH-lzr0fH0h0SDOp8d19PGQB3eXI7hXucLTot1jlqXUG8=w1280",
    niche: "Kids | Adults | Phonics",
  },
  {
    id: 25,
    name: "Teacher Feyy",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeluZUdG9SgZ7YFomuTtcoZTrjOo_9QbrcIri1B84h3Os5Ef-BWJMsLPm9HGng0XyS8kclJrfHyH5Wte0455dOpAyQ7AMkwjWc-Cx1kPaCenndf8ER5TTZFC-7pZLhWvK5bFFIchtcvcxd55FMFQCI7ilpG95JbgMUul7YET9LtkOfEsCf7pkDn0rCa2CtB6tPSQTzCLEJpMN0kI3rfNZ-SXOf_mFFi8Vn3=w1280",
    niche: "Kids | PET | Conversational",
  },
  {
    id: 26,
    name: "Teacher Menim",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcbxVCZ-oqHfpzaZoAIx8i7hDHV9nGZWmGtsgKNAyQP369sexa2mjHwcpHj7wfNjJaVva2KrqGmUZV53HCUNsmoEsPvszVY_3jgiO82OReh73QUiXkzYZJsEhhAiXdDBmsaHq7AcR0tTere2t_OPc32X4TuxfSl0FL-fc1m7jOKKPKuYJZ1JLqfLqa0mbXSfBgkeOQnii-K8CXOCE3Zeu55ZujzqVPNCj4X=w1280",
    niche: "Kids | Business | Spelling",
  },
  {
    id: 27,
    name: "Teacher Shere",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkfIkKUvULZlKoqDE3BhQzLhwmNG4v0eIO32q6ovArztHWTVQMhAXydsR_jDBwDDrPgjbdHdsbzsSAM1IvWx3lLTr_PzH-x_IgBcpGqV17SD2HnEdk_f8KpsD6Q1gdD2DpT0NRNVQ2oGVKCtjTnaETWJoUP6YddJzf3FZYgUByLR0_lG5LyvaDNnfYNdKLPiRnltlL-IL4O7TwfYmOEFRj64EkZSOaSLtUMyHC8=w1280",
    niche: "Kids | Adults | Diction",
  },
  {
    id: 28,
    name: "Teacher Esther",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkdoKetGQ-hrPnjyZzxXyR_o2dP3XmeDGvu6S-VKe8QTLRIOZ92sSmqRsRycBw0-9XI-dOWWo3cSjebphskf2Vt1AehlVc1U4oyqcgLlAHoDOV4NyVenIYzeNzgBnziheHxa00JTJ-CGSkZXa1iUsoV2UFjXMa_J4xVNldhIJPulFrhr19G18Y7tLGxrCyPqg5SG-abPL90XQfFA_Bgpxt9xkof2G2r1YBTKHVo=w1280",
    niche: "IELTS | CAE | PET | KET",
  },
  {
    id: 29,
    name: "Teacher Oby",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcvaNIx2nPzJAgmimYAFpDYPntX9PnKYQbE-mcPvb145K7y9Z0mS2DQpxs9RXhftMg8S0zJLL3CXrS8t39wd064kNHQSCqVf2APAAi7aHOzP1onWa5vg0ZV0i9K2cFz2GwNqYNr13bq9y3PjwE9Az5-C5Q-tKYUBZWNIrjVEWqL_eZQ95JVIGWiruY=w1280",
    niche: "Kids | Phonics | PET",
  },
  {
    id: 30,
    name: "Teacher Amen",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkdHGCp1Ckv5V0vv6YRqHk-5JXMBsseYh24tHMUbxExSN0Ok55iQNSgcAzBB_3nw3Gyv4QeLdP7mtMx7g6oTuBB1UaMDao_NkM3yh8Z5RL3Sb6AHfJ8WCUL-9JTcOwDOkg6Yg3lyGRUwYSzHJ5IiGI1YnViWFGAmY1YyzEt2NENtQyijvUcYdofm--VxH4SoSZk2ZErq7cpeAAyzJr74uCG_uBYHS7QeuCs5=w1280",
    niche: "Kids | Young Adults | Phonics",
  },
  {
    id: 31,
    name: "Teacher Prince",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcVc13OOI8-uw-BAUhdjGR49TvqOOD2tDB6lp6LZ7__pwgFDTVi6fje4JZEnN03KVMwlZusafE801q2aYYtyg3nIPbJPcwAJ7ErKp-UpyuF2YuvYBsaDRHZy5iyR-nh4tD-0Ut9gH83zu_Q-J8d-8h91i20-THzAuvIs2p4OBiXlvi5bJCpBZRX7j0HVpQ8lXwa0TPkIWQiRrJaVyvn1Q3I5TnQc-rXESFnyw0=w1280",
    niche: "Kids | PET | KET",
  },
  {
    id: 32,
    name: "Teacher Rossy",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkf6hAxACw8y4ncoVeKVnS074S71Zc_sRqiIrrEjjduHMTlth7JyIXq50LJjyWNiVrTj-lq5aZHQt0wCljESBTc_jOhSqGLNF7zrz4UZVHEk__dByR8JoSHZLV5NzG4OKyCLaqjv87yQyax77NggEI5TOqjhNwHKGEDRh3Cu6i5jZebakGXg3oJvLM_kroK8vPk1OgbyAUFOi5HANFvPUfJL3Kj2f5RxSpF0vg0=w1280",
    niche: "Teenagers | Business",
  },
  {
    id: 33,
    name: "Teacher Temmy",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkcDgq88376-vncWTkhWAdAlvDHQ4o-s17cNBa0rBoYnowbmOTl4pjngbKASJixN9f9jHLgChWqjvoIHOchsqU0V7x0AhnHxBXAqIoTV0pss7PAT0bc4QGzu9XDJb5bvnhKk9mT_WNrw1n30mZs_8RZ79RYEUoa8YP2xmW8SjONdvBcsmw6eDJYqSu9fxj9VQpE2btV0Olx8NBDavPn43UwtqQPuAKr1wuosyxs=w1280",
    niche: "General | Conversational",
  },
  {
    id: 34,
    name: "Teacher Susan",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkfzPo-zP97QAburwo51opfr0sA6Krz7Hcyuk42zkmP3p2XuZnBdyaXQwk4WLdcATE17QmR4Bgu-D1ot579uONVKGe6YWdCkyV-MTdypPRgh2JGuBFRYablZY89u1BeYERB64W0RVgrdkYSUAMXQFpwMQZUfJEwqro-ITcmlL6KrnVnkos2m3H_GOmlEchiZZhGUFThcBKNOHpbWhQsBJcVsjrXNhSC9Qrkh=w1280",
    niche: "Kids | Business | Conversational",
  },
  {
    id: 35,
    name: "Teacher AJ",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkeuQF6RaUoj-XnT2QFVrSBf6SJnZrDbJ8cjFKOExjbirmNN9DxApEXBu-kWP2X6FHt106mu5cNJKUGrbrefo5ontHY1hvveflZXv5ElvZmco6zLOcKo5xQziort3yKMjm0h__reUe4sTPBkBJXqfLFmKN2QTyEesfkvkCgvxAiNIl74v1O-Ago63GXjc1RPwfNifgRAG1-zfvZZ7o4xh1rr71LhqZ9ClIJrgXo=w1280",
    niche: "Kids | Phonics | KET | PET",
  },
  {
    id: 36,
    name: "Teacher Ceecee",
    image:
      "https://lh3.googleusercontent.com/sitesv/AAzXCkegrMy_B4Oabc-42ystLdpF3gE4ZwLwVJXDHT003YDnFmJ9x7sCArxOAwmDJkeCR7i7bEkXFnoUppHP7krSfq9sYSHYNxhxzH1Kld-0NU-aHUvWBS991yytM-ZU8h5hIkSlQMLnY6tclDdltWXVZSUUpLqyrh9zMlRcuyD_nPNF5cwx9uLQXlnhDFqI4wmjy1sae2Geo8oAvxuRFhPJUmTGoQWr-stPIr85=w1280",
    niche: "Kids | Phonics | Vocabulary",
  },
];

const benefits = [
  {
    icon: "✓",
    title: "Trained",
    description: "Certified through our rigorous training program",
  },
  {
    icon: "🔍",
    title: "Vetted",
    description: "Thoroughly screened for quality and professionalism",
  },
  {
    icon: "⭐",
    title: "Experienced",
    description: "Years of teaching experience in their specialties",
  },
  {
    icon: "🌍",
    title: "Globally Ready",
    description: "Prepared to teach international students worldwide",
  },
];

export default function Tutors() {
  const [formData, setFormData] = useState({
    companyName: "",
    roleNeeded: "",
    teachingNiche: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        companyName: "",
        roleNeeded: "",
        teachingNiche: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 bg-linear-to-b from-amber-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-800 mb-6">
              Hire Certified ESL Tutors
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Meet certified teachers trained by Prouda Tutors and ready for
              global classrooms.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl sm:text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-amber-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Grid Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
            Meet Our Certified Tutors
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Browse our team of skilled ESL educators ready to help your students succeed
          </p>
          <a
            href="https://sites.google.com/view/prouda-tutors/home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            View Full Profiles →
          </a>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-6"></div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-2">{tutor.name}</h3>
                <p className="text-sm sm:text-base text-amber-800 font-semibold bg-amber-100 px-3 py-1 rounded-full inline-block">
                  {tutor.niche}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA & Contact Form Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* CTA Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">
              Looking to Hire a Qualified ESL Tutor?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will match you with the
              perfect tutor for your needs.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-linear-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-8 sm:p-10 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-amber-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your inquiry has been submitted successfully. We'll be in
                  touch soon with tutor recommendations.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm sm:text-base font-semibold text-amber-800 mb-2"
                  >
                    Company/Institution Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Role Needed */}
                <div>
                  <label
                    htmlFor="roleNeeded"
                    className="block text-sm sm:text-base font-semibold text-amber-800 mb-2"
                  >
                    Role/Position Needed *
                  </label>
                  <select
                    id="roleNeeded"
                    name="roleNeeded"
                    value={formData.roleNeeded}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="">Select a role</option>
                    <option value="Full-time Tutor">Full-time Tutor</option>
                    <option value="Part-time Tutor">Part-time Tutor</option>
                    <option value="Corporate Trainer">Corporate Trainer</option>
                    <option value="Curriculum Developer">
                      Curriculum Developer
                    </option>
                  </select>
                </div>

                {/* Teaching Niche */}
                <div>
                  <label
                    htmlFor="teachingNiche"
                    className="block text-sm sm:text-base font-semibold text-amber-800 mb-2"
                  >
                    Teaching Niche *
                  </label>
                  <select
                    id="teachingNiche"
                    name="teachingNiche"
                    value={formData.teachingNiche}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="">Select a niche</option>
                    <option value="Kids & Beginners">Kids & Beginners</option>
                    <option value="Business English">Business English</option>
                    <option value="IELTS Preparation">IELTS Preparation</option>
                    <option value="TOEFL & Academic">TOEFL & Academic</option>
                    <option value="Conversational English">
                      Conversational English
                    </option>
                    <option value="Corporate Training">
                      Corporate Training
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm sm:text-base font-semibold text-amber-800 mb-2"
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    placeholder="Tell us more about your requirements, class size, student level, etc."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Hire a Tutor
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-r from-amber-600 to-amber-700 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
            <div>
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3">
                50+
              </h3>
              <p className="text-lg sm:text-xl text-amber-50">
                Certified Tutors Ready to Teach
              </p>
            </div>
            <div>
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3">
                100+
              </h3>
              <p className="text-lg sm:text-xl text-amber-50">
                Institutions Partnering With Us
              </p>
            </div>
            <div>
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3">
                10+
              </h3>
              <p className="text-lg sm:text-xl text-amber-50">
                Teaching Niches Covered
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
