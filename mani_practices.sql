use Aspire_Practices;

select * from Product;

CREATE TABLE ProductSales(
Admin_Id INT NOT NULL PRIMARY KEY,
total_prd INT NOT NULL  
);
INSERT INTO ProductSales value(201,0);
DROP TABLE ProductSales;
DELIMITER $$
CREATE TRIGGER Product_count AFTER INSERT ON Product FOR EACH ROW
BEGIN
DECLARE prodCount INT;
SElECT  COUNT(Prd_Id) INTO prodCount FROM Product;
UPDATE ProductSales SET total_prd=prodCount WHERE Admin_Id=201;
END $$
DELIMITER ;

DROP TRIGGER Product_count;

INSERT INTO Product Value (107,'LED Light',8,2000);

SELECT * FROM ProductSales;

CREATE TABLE EMPLOYEE(
EMP_ID INT NOT NULL PRIMARY KEY,
EMP_NAME VARCHAR(200) NOT NULL,
EMP_DOJ DATE NOT NULL,
EMP_DEG VARCHAR(200) NOT NULL,
EMP_SALARY INT NOT NULL

);

SELECT * FROM EMPLOYEE;

INSERT  EMPLOYEE VALUE (105,'Arun','2018-08-20','Team Lead',70000);

DELIMITER $$

CREATE PROCEDURE EMP_DOY(IN EMP_DY DATE) 
BEGIN
DECLARE EMP_Y INT;
SET EMP_Y := YEAR(EMP_dY);

SELECT * FROM EMPLOYEE WHERE YEAR(EMP_DOJ) = EMP_Y;

END $$

DELIMITER ; 

CREATE VIEW SENIOR_EMP AS SELECT * FROM EMPLOYEE ORDER BY EMP_DOJ LIMIT 1;

SELECT * FROM SENIOR_EMP;

CALL EMP_DOY('2020-10-20');  

DELIMITER &&

CREATE FUNCTION PROD_QUA(PROD_ID INT, PROD_PRI INT) RETURNS VARCHAR(200) 
DETERMINISTIC
BEGIN 
DECLARE PROD_TYPE VARCHAR(200);
DECLARE PROD_PRICE_TABLE INT;
SELECT Prd_Price INTO PROD_PRICE_TABLE FROM Product WHERE Prd_Id= PROD_ID;
IF PROD_PRICE_TABLE > PROD_PRI THEN
SET PROD_TYPE := 'GOOD';

ELSE IF PROD_PRICE_TABLE = PROD_PRI THEN
SET PROD_TYPE := 'AVERAGE';

ELSE 
SET PROD_TYPE := 'BAD';

END IF;
END IF;
RETURN PROD_TYPE;

END &&
DELIMITER ;

DROP FUNCTION PROD_QUA;
SELECT PROD_QUA(102,500000) AS PROD_TYPE;
