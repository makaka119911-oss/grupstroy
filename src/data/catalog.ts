export type Category = {
  id: string;
  slug: string;
  title: string;
  accent: string;
  intro: string;
};

export type Product = {
  slug: string;
  categoryId: string;
  title: string;
  subtitle: string;
  material: string;
  finish: string;
  term: string;
  price: string;
  image: string;
  imageAlt: string;
};

export const slogan =
  'Любая сложность. Ваш чертёж = наш итог. Нет чертежа? Разработаем дизайн и рабочую документацию под ключ.';

export const variantsBlock =
  'Данное изделие — лишь визуальный пример. Мы изменим ДЛИНУ, ШИРИНУ, ВЫСОТУ, ТОЛЩИНУ, ПОРОДУ ДЕРЕВА и ВИД ОТДЕЛКИ под ваши задачи. Пришлите эскиз или референс — мы рассчитаем стоимость за 1 час.';

export const categories: Category[] = [
  {
    id: 'kuhnya',
    slug: 'kuhnya',
    title: 'Кухонный гарнитур и мебель для еды',
    accent: 'Влагостойкость, фрезеровка фасадов, скрытый крепёж',
    intro:
      'Пять примеров из практики — не каталог ограничений. Любая геометрия кухни, острова и обеденных зон под ваш проект.',
  },
  {
    id: 'korpus',
    slug: 'korpus',
    title: 'Корпусная и модульная мебель',
    accent: 'Геометрия, встраивание в ниши, нестандартные размеры',
    intro: 'Модули под нишу, радиусные фасады, системы хранения — всё по размерам помещения.',
  },
  {
    id: 'dekor',
    slug: 'dekor',
    title: 'Интерьерная столярка',
    accent: 'Эстетика, порталы, скрытые двери',
    intro: 'Декор и конструктив: от дверей-невидимок до лестниц и порталов.',
  },
  {
    id: 'malaya-forma',
    slug: 'malaya-forma',
    title: 'Малая форма',
    accent: 'Ювелирная точность, подарки',
    intro: 'Небольшие изделия с той же точностью, что и крупная мебель.',
  },
  {
    id: 'sad',
    slug: 'sad',
    title: 'Садовая и уличная серия',
    accent: 'Твёрдые породы, защита от УФ и влаги',
    intro: 'Уличная мебель и терраса — массив и правильная защита древесины.',
  },
];

export const products: Product[] = [
  // БЛОК 1
  {
    slug: 'ostrov-tortsevaya-stoleshnitsa',
    categoryId: 'kuhnya',
    title: 'Остров «Торец»',
    subtitle: 'Кухонный остров с торцевой столешницей из массива',
    material: 'Дуб / ясень',
    finish: 'Масло + воск, влагостойкий состав',
    term: 'от 4 недель',
    price: 'по запросу',
    image: '/images/catalog/ostrov-tortsevaya-stoleshnitsa.jpg',
    imageAlt: 'Кухонный остров из массива',
  },
  {
    slug: 'falsh-panel-kholodilnik',
    categoryId: 'kuhnya',
    title: 'Панель «В ряд»',
    subtitle: 'Фальш-панель для холодильника в цвет гарнитура',
    material: 'МДФ + шпон / массив',
    finish: 'Эмаль или масло под фасады',
    term: 'от 10 дней',
    price: 'по запросу',
    image: '/images/catalog/falsh-panel-kholodilnik.jpg',
    imageAlt: 'Встроенная кухня с техникой',
  },
  {
    slug: 'stol-transformer',
    categoryId: 'kuhnya',
    title: 'Стол-винджаммер',
    subtitle: 'Обеденный стол-трансформер (книжка / раздвижной)',
    material: 'Дуб / бук',
    finish: 'Масло Hardwax Oil',
    term: 'от 3 недель',
    price: 'по запросу',
    image: '/images/catalog/stol-transformer.jpg',
    imageAlt: 'Деревянный обеденный стол',
  },
  {
    slug: 'barnaya-stoyka',
    categoryId: 'kuhnya',
    title: 'Барная «Колонна»',
    subtitle: 'Барная стойка с резными опорами ручной работы',
    material: 'Ясень / дуб',
    finish: 'Масло + патина по желанию',
    term: 'от 3 недель',
    price: 'по запросу',
    image: '/images/catalog/barnaya-stoyka.jpg',
    imageAlt: 'Барная стойка в интерьере',
  },
  {
    slug: 'navesnye-shkafy-yasen',
    categoryId: 'kuhnya',
    title: 'Навес «Ясень»',
    subtitle: 'Навесные шкафы с фасадами из массива ясеня без видимой фурнитуры',
    material: 'Ясень',
    finish: 'Масло, push-to-open',
    term: 'от 4 недель',
    price: 'по запросу',
    image: '/images/catalog/navesnye-shkafy-yasen.jpg',
    imageAlt: 'Навесные кухонные шкафы',
  },
  // БЛОК 2
  {
    slug: 'stellaz-lestnitsa',
    categoryId: 'korpus',
    title: 'Стеллаж «Асимметрия»',
    subtitle: 'Стеллаж-лесенка асимметричный',
    material: 'Сосна / дуб',
    finish: 'Масло / лак матовый',
    term: 'от 2 недель',
    price: 'по запросу',
    image: '/images/catalog/stellaz-lestnitsa.jpg',
    imageAlt: 'Стеллаж-лесенка из дерева',
  },
  {
    slug: 'shkaf-kupe-radius',
    categoryId: 'korpus',
    title: 'Шкаф «Дуга»',
    subtitle: 'Шкаф-купе с радиусными (гнутыми) фасадами',
    material: 'МДФ гнутый + шпон',
    finish: 'Эмаль / шпон дуба',
    term: 'от 5 недель',
    price: 'по запросу',
    image: '/images/catalog/shkaf-kupe-radius.jpg',
    imageAlt: 'Шкаф-купе в спальне',
  },
  {
    slug: 'penal-prihozhaya',
    categoryId: 'korpus',
    title: 'Пенал «Прихожая»',
    subtitle: 'Система хранения в прихожую под обувь и одежду',
    material: 'Бук / ЛДСП + фасад массив',
    finish: 'Масло на фасадах',
    term: 'от 3 недель',
    price: 'по запросу',
    image: '/images/catalog/penal-prihozhaya.jpg',
    imageAlt: 'Прихожая с системой хранения',
  },
  {
    slug: 'komod-yashchiki',
    categoryId: 'korpus',
    title: 'Комод «Полный выдвиж»',
    subtitle: 'Комод с ящиками на направляющих полного выдвижения',
    material: 'Дуб / орех',
    finish: 'Масло + воск',
    term: 'от 3 недель',
    price: 'по запросу',
    image: '/images/catalog/komod-yashchiki.jpg',
    imageAlt: 'Деревянный комод с ящиками',
  },
  {
    slug: 'vitrina-kollektsii',
    categoryId: 'korpus',
    title: 'Витрина «Коллекция»',
    subtitle: 'Витрина для коллекций со стеклянными полками и подсветкой',
    material: 'Дуб / ясень + стекло',
    finish: 'Масло, LED-подсветка',
    term: 'от 4 недель',
    price: 'по запросу',
    image: '/images/catalog/vitrina-kollektsii.jpg',
    imageAlt: 'Витрина с подсветкой',
  },
  // БЛОК 3
  {
    slug: 'dver-nevidimka',
    categoryId: 'dekor',
    title: 'Дверь «Невидимка»',
    subtitle: 'Межкомнатная дверь со скрытой коробкой',
    material: 'Массив / шпон',
    finish: 'Масло в тон стены',
    term: 'от 3 недель',
    price: 'по запросу',
    image: '/images/catalog/dver-nevidimka.jpg',
    imageAlt: 'Скрытая межкомнатная дверь',
  },
  {
    slug: 'paneli-3d-reshetka',
    categoryId: 'dekor',
    title: 'Панели «Решётка 3D»',
    subtitle: 'Декоративные деревянные панели с 3D-решёткой на стену',
    material: 'Дуб / ясень',
    finish: 'Масло / лазурь',
    term: 'от 2 недель',
    price: 'по запросу',
    image: '/images/catalog/paneli-3d-reshetka.jpg',
    imageAlt: 'Деревянные рейки на стене',
  },
  {
    slug: 'portal-kamin',
    categoryId: 'dekor',
    title: 'Портал «Очаг»',
    subtitle: 'Портал камина (имитация) из массива',
    material: 'Дуб / орех',
    finish: 'Масло + браширование',
    term: 'от 4 недель',
    price: 'по запросу',
    image: '/images/catalog/portal-kamin.jpg',
    imageAlt: 'Деревянный портал камина',
  },
  {
    slug: 'lestnitsa-boltz',
    categoryId: 'dekor',
    title: 'Лестница «Больцы»',
    subtitle: 'Лестница на больцах, ступени из цельного дуба',
    material: 'Цельный дуб',
    finish: 'Масло Hardwax',
    term: 'от 6 недель',
    price: 'по запросу',
    image: '/images/catalog/lestnitsa-boltz.jpg',
    imageAlt: 'Деревянная лестница в доме',
  },
  {
    slug: 'karniz-pilyastry',
    categoryId: 'dekor',
    title: 'Карниз «Зонирование»',
    subtitle: 'Карниз и пилястры для зонирования гостиной',
    material: 'Дуб / сосна',
    finish: 'Грунт + эмаль / масло',
    term: 'от 2 недель',
    price: 'по запросу',
    image: '/images/catalog/karniz-pilyastry.jpg',
    imageAlt: 'Деревянный карниз в интерьере',
  },
  // БЛОК 4
  {
    slug: 'shkatulka-organayzer',
    categoryId: 'malaya-forma',
    title: 'Шкатулка «Органайзер»',
    subtitle: 'Шкатулка с системой органайзеров внутри',
    material: 'Орех / бук',
    finish: 'Воск + масло',
    term: 'от 10 дней',
    price: 'по запросу',
    image: '/images/catalog/shkatulka-organayzer.jpg',
    imageAlt: 'Деревянная шкатулка ручной работы',
  },
  {
    slug: 'doski-end-grain',
    categoryId: 'malaya-forma',
    title: 'Доски «Торец»',
    subtitle: 'Разделочные доски из торца сруба (энд-грейн)',
    material: 'Клён / дуб / орех',
    finish: 'Пищевое масло',
    term: 'от 5 дней',
    price: 'по запросу',
    image: '/images/catalog/doski-end-grain.jpg',
    imageAlt: 'Разделочные доски end grain',
  },
  {
    slug: 'podstavka-noutbuk',
    categoryId: 'malaya-forma',
    title: 'Подставка «Угол»',
    subtitle: 'Подставка для ноутбука с регулируемым углом',
    material: 'Бук / орех',
    finish: 'Масло',
    term: 'от 7 дней',
    price: 'по запросу',
    image: '/images/catalog/podstavka-noutbuk.jpg',
    imageAlt: 'Деревянная подставка для ноутбука',
  },
  {
    slug: 'konstruktor-igrushki',
    categoryId: 'malaya-forma',
    title: 'Конструктор «Дерево»',
    subtitle: 'Набор деревянных игрушек-конструкторов',
    material: 'Бук (детский сорт)',
    finish: 'Пищевое масло',
    term: 'от 7 дней',
    price: 'по запросу',
    image: '/images/catalog/konstruktor-igrushki.jpg',
    imageAlt: 'Деревянные игрушки',
  },
  {
    slug: 'ramka-zerkalo',
    categoryId: 'malaya-forma',
    title: 'Рама «Профиль»',
    subtitle: 'Эксклюзивная рамка для зеркала со сложным профилем',
    material: 'Дуб / ясень',
    finish: 'Масло / золочение по ТЗ',
    term: 'от 2 недель',
    price: 'по запросу',
    image: '/images/catalog/ramka-zerkalo.jpg',
    imageAlt: 'Зеркало в деревянной раме',
  },
  // БЛОК 5
  {
    slug: 'skameyka-sad',
    categoryId: 'sad',
    title: 'Скамья «Сад»',
    subtitle: 'Садовая скамья с коваными или деревянными ножками',
    material: 'Тик / лиственница / дуб',
    finish: 'Масло для экстерьера',
    term: 'от 2 недель',
    price: 'по запросу',
    image: '/images/catalog/skameyka-sad.jpg',
    imageAlt: 'Садовая скамья',
  },
  {
    slug: 'stol-piknik',
    categoryId: 'sad',
    title: 'Стол «Пикник»',
    subtitle: 'Стол для тенниса / пикника — всепогодный',
    material: 'Лиственница / тик',
    finish: 'Масло с УФ-фильтром',
    term: 'от 2 недель',
    price: 'по запросу',
    image: '/images/catalog/stol-piknik.jpg',
    imageAlt: 'Садовый деревянный стол',
  },
  {
    slug: 'kacheli-divan',
    categoryId: 'sad',
    title: 'Качели «Навес»',
    subtitle: 'Качели-диван под навес',
    material: 'Лиственница + нержавейка',
    finish: 'Масло для улицы',
    term: 'от 3 недель',
    price: 'по запросу',
    image: '/images/catalog/kacheli-divan.jpg',
    imageAlt: 'Уличные качели',
  },
  {
    slug: 'podstavka-kashpo',
    categoryId: 'sad',
    title: 'Этажерка «Кашпо»',
    subtitle: 'Подставка для кашпо и цветов многоярусная',
    material: 'Сосна / лиственница',
    finish: 'Лазурь + масло',
    term: 'от 10 дней',
    price: 'по запросу',
    image: '/images/catalog/podstavka-kashpo.jpg',
    imageAlt: 'Деревянная подставка для цветов',
  },
  {
    slug: 'terrasnaya-doska',
    categoryId: 'sad',
    title: 'Терраса «Скрытый крепёж»',
    subtitle: 'Террасная доска из массива со скрытым крепежом',
    material: 'Лиственница / тик / дуб',
    finish: 'Масло для террасы',
    term: 'от 2 недель',
    price: 'по запросу',
    image: '/images/catalog/terrasnaya-doska.jpg',
    imageAlt: 'Деревянная терраса у дома',
  },
];

export const services = [
  {
    id: 1,
    title: 'Разработка конструкторской документации (КД)',
    text: 'По вашему эскизу или фото — рабочие чертежи для производства.',
  },
  {
    id: 2,
    title: '3D-модель и визуализация в интерьере',
    text: 'Бесплатно при заказе от 100 000 ₽. Увидите изделие в комнате до изготовления.',
  },
  {
    id: 3,
    title: 'Адаптация чертежа под ваш материал',
    text: 'Экономия на закупке — подстроим проект под то, что уже есть на объекте.',
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
