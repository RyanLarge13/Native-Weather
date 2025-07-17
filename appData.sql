TABLE Settings {
    tempUnits            VARCHAR(255) DEFAULT "F" NOT NULL,
    preferredCity        VARCHAR(255) DEFAULT "Location" NOT NULL,
    theme                VARCHAR(255) DEFAULT "orange" NOT NULL,
    accuracy             BOOLEAN DEFAULT true NOT NULL,
    notificationInterval INTEGER DEFAULT 1 NOT NULL
};

TABLE Locations {
    id   VARCHAR(255) NOT NULL, -- Going to use UUIDS
    name VARCHAR(255) DEFAULT "Tokyo,Japan" NOT NULL
    lastUsed Date NOT NULL DEFAULT -- Now()
};