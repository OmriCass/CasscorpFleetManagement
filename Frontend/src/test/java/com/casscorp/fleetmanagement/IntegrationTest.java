package com.casscorp.fleetmanagement;

import com.casscorp.fleetmanagement.FrontendApp;
import com.casscorp.fleetmanagement.config.AsyncSyncConfiguration;
import com.casscorp.fleetmanagement.config.EmbeddedElasticsearch;
import com.casscorp.fleetmanagement.config.EmbeddedPulsar;
import com.casscorp.fleetmanagement.config.EmbeddedSQL;
import com.casscorp.fleetmanagement.config.TestSecurityConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { FrontendApp.class, AsyncSyncConfiguration.class, TestSecurityConfiguration.class })
@EmbeddedElasticsearch
@EmbeddedSQL
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@EmbeddedPulsar
public @interface IntegrationTest {
    // 5s is Spring's default https://github.com/spring-projects/spring-framework/blob/main/spring-test/src/main/java/org/springframework/test/web/reactive/server/DefaultWebTestClient.java#L106
    String DEFAULT_TIMEOUT = "PT5S";

    String DEFAULT_ENTITY_TIMEOUT = "PT5S";
}
