# Data Management: JDBC, Transactions, JPA, Spring Data

## [WIP] 積み残し課題
* What is the difference between checked and unchecked exceptions?
* Why does Spring prefer unchecked exceptions?
* What is the data access exception hierarchy?
* How do you configure a DataSource in Spring? Which bean is very useful for development/test databases?
* What is the Template design pattern and what is the JDBC template?
* What is a callback? What are the three JdbcTemplate callback interfaces that can be used with queries? What is each used for? (You would not have to remember the interface names in the exam, but you should know what they do if you see them in a code sample).
* Can you execute a plain SQL statement with the JDBC template?
* When does the JDBC template acquire (and release) a connection - for every method called or once per template? Why?
* How does the JdbcTemplate support generic queries? How does it return objects and lists/maps of objects?
* What is a transaction? What is the difference between a local and a global transaction?
* Is a transaction a cross cutting concern? How is it implemented by Spring?
* How are you going to define a transaction in Spring?
* What does @Transactional do? What is the PlatformTransactionManager?
* Is the JDBC template able to participate in an existing transaction?
* What is a transaction isolation level? How many do we have and how are they ordered?
* What is @EnableTransactionManagement for?
* What does transaction propagation mean?
* What happens if one @Transactional annotated method is calling another @Transactional annotated method on the same object instance?
* Where can the @Transactional annotation be used? What is a typical usage if you put it at class level?
* What does declarative transaction management mean?
* What is the default rollback policy? How can you override it?
* What is the default rollback policy in a JUnit test, when you use the @RunWith(SpringJUnit4ClassRunner.class) in JUnit 4 or @ExtendWith(SpringExtension.class) in JUnit 5, and annotate your @Test annotated method with @Transactional?
* Why is the term "unit of work" so important and why does JDBC AutoCommit violate this pattern?
* What does JPA stand for - what about ORM?
* What is the idea behind an ORM? What are benefits/disadvantages or ORM?
* What is a PersistenceContext and what is an EntityManager. What is the relationship between both?
* Why do you need the @Entity annotation. Where can it be placed?
* What do you need to do in Spring if you would like to work with JPA?
* Are you able to participate in a given transaction in Spring while working with JPA?
* Which PlatformTransactionManager(s) can you use with JPA?
* What does @PersistenceContext do?
* What do you have to configure to use JPA with Spring? How does Spring Boot make this easier?
* What is an "instant repository"? (hint: recall Spring Data)
* How do you define an “instant” repository? Why is it an interface not a class?
* What is the naming convention for finder methods?
* How are Spring Data repositories implemented by Spring at runtime?
* What is @Query used for?