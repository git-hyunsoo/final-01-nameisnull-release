//카테고리 객체 매핑
export const categories = {
  dog: {
    food: {
      name: '사료',
      sub: {
        dry: '건식',
        wet: '습식/화식',
        'freeze-dried': '건조',
        etc: '기타',
      },
    },
    treat: {
      name: '간식',
      sub: {
        gum: '껌',
        jerky: '저키',
        'dried-meat': '육포',
        can: '캔',
        biscuit: '비스킷',
        etc: '기타',
      },
    },
    supplies: {
      name: '용품',
      sub: {
        hygiene: '위생/케어',
        toilet: '배변용품',
        toy: '장난감',
        outdoor: '외출/산책',
        mat: '방석/매트',
        etc: '기타',
      },
    },
    health: {
      name: '건강',
      sub: {
        supplement: '보조제',
        checkup: '건강검진',
        skin: '피부/모질',
        ointment: '연고',
        etc: '기타',
      },
    },
    clothing: {
      name: '의류',
      sub: {
        accessory: '액세서리',
        sleeveless: '민소매',
        'all-in-one': '올인원',
        outer: '아우터',
        etc: '기타',
      },
    },
  },
  cat: {
    food: {
      name: '사료',
      sub: {
        dry: '건식',
        wet: '습식/화식',
        'freeze-dried': '건조',
        etc: '기타',
      },
    },
    treat: {
      name: '간식',
      sub: {
        pouch: '파우치',
        snack: '스낵/트릿',
        'whole-meat': '통살',
        can: '캔',
        catnip: '캣닢',
        etc: '기타',
      },
    },
    supplies: {
      name: '용품',
      sub: {
        litter: '모래',
        toilet: '배변용품',
        toy: '장난감',
        tower: '캣타워',
        scratcher: '스크래쳐',
        etc: '기타',
      },
    },
    health: {
      name: '건강',
      sub: {
        supplement: '보조제',
        checkup: '케어·검진',
        etc: '기타',
      },
    },
    clothing: {
      name: '의류',
      sub: {
        clothing: '의류',
        accessory: '악세서리',
        sleeveless: '민소매',
        etc: '기타',
      },
    },
  },
};
