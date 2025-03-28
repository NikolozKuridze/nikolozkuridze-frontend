export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    type: 'web' | 'backend' | 'corporate' | 'financial';
}
 
export const projectsData: Project[] = [
    {
        id: 1,
        title: 'სამინისტროს პორტალი',
        description: 'მოქალაქეების მომსახურების პორტალი საქართველოს შრომის, ჯანმრთელობისა და სოციალური დაცვის სამინისტროსთვის. სისტემა შექმნილია მაღალი უსაფრთხოების სტანდარტებით, მომხმარებლის მარტივი ინტერფეისით და ოპტიმიზირებული მონაცემთა დამუშავებით.',
        image: '/assets/images/projects/project1.jpg',
        technologies: ['C#', '.NET 8', 'ASP.NET Core', 'SQL Server', 'Entity Framework Core', 'CQRS', 'Mediator', 'Clean Architecture', 'Identity Server 4', 'JWT'],
        link: 'https://example.com/project1',
        type: 'corporate',
    },
    {
        id: 2,
        title: 'ბანკის პლატფორმა',
        description: 'ინოვაციური ფინანსური პლატფორმა, რომელიც აერთიანებს მიკროსერვისების არქიტექტურას და უსაფრთხო API-ებს PSD2 რეგულაციების დაცვით. პროექტი ოპტიმიზირებულია მაღალი დატვირთვისთვის და მონაცემთა უსაფრთხოებისთვის.',
        image: '/assets/images/projects/project2.jpg',
        technologies: ['ASP.NET Core', 'C#', 'Microservices', 'Entity Framework Core', 'Dapper', 'OAuth 2.0', 'JWT', 'SQL Server', 'Azure DevOps', 'CI/CD'],
        link: 'https://example.com/project2',
        type: 'financial',
    },
    {
        id: 3,
        title: 'IMEI ვერიფიკაციის სისტემა',
        description: 'კომპლექსური ვებ აპლიკაცია მობილური ტელეფონების IMEI კოდების ვერიფიკაციისთვის. სისტემა ინტეგრირებულია გადახდის სისტემებთან და უზრუნველყოფს სწრაფ ვერიფიკაციას 10 წამზე ნაკლებ დროში.',
        image: '/assets/images/projects/project3.jpg',
        technologies: ['HTML', 'CSS', 'jQuery', 'ASP.NET MVC', '.NET Web API', 'Payment gateways', 'SQL'],
        link: 'https://example.com/project3',
        type: 'web',
    },
    {
        id: 4,
        title: 'HR კანდიდატების შერჩევის სისტემა',
        description: 'ავტომატიზირებული სისტემა კანდიდატების შერჩევისთვის, რომელიც მოიცავს SQL-ზე დაფუძნებულ დახვეწილ მატჩინგის ალგორითმებს. სისტემამ შეამცირა კანდიდატის შერჩევის დრო 40%-ით.',
        image: '/assets/images/projects/project4.jpg',
        technologies: ['C#', 'ASP.NET Core', 'MS SQL', 'JavaScript', 'Entity Framework'],
        link: 'https://example.com/project4',
        type: 'backend',
    },
    {
        id: 5,
        title: 'GAMAGAS.GE',
        description: 'ონლაინ სერვისი გაზის მიწოდების კომპანიისთვის. პროექტი მოიცავს მომხმარებლის განაცხადების დამუშავებას, ავტომატიზირებულ გადახდებს და რეალურ დროში მონიტორინგს.',
        image: '/assets/images/projects/project5.jpg',
        technologies: ['C#', 'ASP.NET Core', 'RESTful APIs', 'SQL', 'JavaScript', 'Angular'],
        link: 'https://gamagas.ge',
        type: 'web',
    },
    {
        id: 6,
        title: 'Open Banking API',
        description: 'PSD2 რეგულაციებთან თავსებადი Open Banking API-ები, შექმნილი საბანკო სექტორისთვის. სისტემა უზრუნველყოფს უსაფრთხო მონაცემთა გაცვლას მესამე მხარის პროვაიდერებთან.',
        image: '/assets/images/projects/project6.jpg',
        technologies: ['.NET Core', 'C#', 'Microservices', 'RESTful APIs', 'OAuth 2.0', 'SQL Server'],
        link: 'https://example.com/project6',
        type: 'financial',
    },
];